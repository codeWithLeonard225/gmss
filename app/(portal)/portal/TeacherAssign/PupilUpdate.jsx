"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { db } from "@/app/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";
import {
  collection,
  doc,
  updateDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

import CameraCapture from "../CaptureCamera/CameraCapture";
import CloudinaryImageUploader from "../CaptureCamera/CloudinaryImageUploader";

const CLOUD_NAME = "dxcrlpike";
const UPLOAD_PRESET = "LeoTechSl Projects";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const getToday = () => new Date().toISOString().slice(0, 10);

const calculateAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return "";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return String(age);
};

const createEmptyForm = (schoolId = "", registeredBy = "") => ({
  id: null,
  studentID: null,
  studentName: "",
  dob: "",
  age: "",
  gender: "",
  addressLine1: "",
  addressLine2: "",
  parentName: "",
  parentPhone: "",
  class: "",
  academicYear: "",
  registrationDate: getToday(),
  registeredBy,
  userPhoto: null,
  userPublicId: null,
  pupilType: "",
  schoolId,
});

const PupilUpdate = () => {
  const { user } = useAuth();

  // School and logged-in account
  const currentSchoolId = user?.schoolId || "";
  const userRole = String(user?.role || "").toLowerCase();
  const isTeacher = userRole === "teacher";

  const teacherId =
    user?.data?.teacherID || user?.teacherID || user?.id || "";

  const registeredBy =
    user?.data?.adminID ||
    user?.data?.teacherID ||
    user?.teacherID ||
    "";

  // Teacher profile is read from the school's Teachers collection.
  const [liveTeacherInfo, setLiveTeacherInfo] = useState(null);
  const [teacherLoading, setTeacherLoading] = useState(true);

  useEffect(() => {
    if (!currentSchoolId || !isTeacher || !teacherId) {
      setLiveTeacherInfo(null);
      setTeacherLoading(false);
      return;
    }

    setTeacherLoading(true);

    const teacherQuery = query(
      collection(db, "Teachers"),
      where("schoolId", "==", currentSchoolId),
      where("teacherID", "==", teacherId)
    );

    const unsubscribe = onSnapshot(
      teacherQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setLiveTeacherInfo(null);
        } else {
          const teacherDoc = snapshot.docs[0];
          setLiveTeacherInfo({ id: teacherDoc.id, ...teacherDoc.data() });
        }
        setTeacherLoading(false);
      },
      (error) => {
        console.error("Error fetching teacher information:", error);
        setLiveTeacherInfo(null);
        setTeacherLoading(false);
        toast.error("Unable to load teacher information.");
      }
    );

    return () => unsubscribe();
  }, [currentSchoolId, isTeacher, teacherId]);

  const isFormTeacher =
    liveTeacherInfo?.isFormTeacher ??
    user?.data?.isFormTeacher ??
    false;

  const assignedClass =
    liveTeacherInfo?.assignClass ||
    liveTeacherInfo?.className ||
    user?.data?.assignClass ||
    user?.data?.className ||
    "";

  // Form Teachers are limited to the class assigned to them.
  const isClassRestricted =
    isTeacher && Boolean(isFormTeacher) && Boolean(assignedClass);

  const [formData, setFormData] = useState(() =>
    createEmptyForm(currentSchoolId, registeredBy)
  );
  const [selectedPupilId, setSelectedPupilId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [users, setUsers] = useState([]);
  const [pupilsLoading, setPupilsLoading] = useState(true);
  const [originalAcademicInfo, setOriginalAcademicInfo] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [accessTypeOptions, setAccessTypeOptions] = useState([]);

  // Keep the form's school and registering user in sync with login.
  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      schoolId: currentSchoolId,
      registeredBy,
    }));
  }, [currentSchoolId, registeredBy]);

  // Update age whenever date of birth changes.
  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      age: calculateAge(previous.dob),
    }));
  }, [formData.dob]);

  // Live pupil list scoped to the logged-in school and, for Form Teachers,
  // further scoped to their assigned class.
  useEffect(() => {
    if (!currentSchoolId) {
      setUsers([]);
      setPupilsLoading(false);
      return;
    }

    if (isTeacher && teacherLoading) {
      setPupilsLoading(true);
      return;
    }

    // Fail closed if this is a Form Teacher without a known class.
    if (isTeacher && isFormTeacher && !assignedClass) {
      setUsers([]);
      setPupilsLoading(false);
      return;
    }

    setPupilsLoading(true);

    const pupilsRef = collection(db, "PupilsReg");
    const pupilsQuery = isClassRestricted
      ? query(
          pupilsRef,
          where("schoolId", "==", currentSchoolId),
          where("class", "==", assignedClass)
        )
      : query(pupilsRef, where("schoolId", "==", currentSchoolId));

    const unsubscribe = onSnapshot(
      pupilsQuery,
      (snapshot) => {
        setUsers(
          snapshot.docs.map((pupilDoc) => ({
            id: pupilDoc.id,
            ...pupilDoc.data(),
          }))
        );
        setPupilsLoading(false);
      },
      (error) => {
        console.error("Firestore PupilsReg listener failed:", error);
        setUsers([]);
        setPupilsLoading(false);
        toast.error("Failed to load pupil records.");
      }
    );

    return () => unsubscribe();
  }, [
    currentSchoolId,
    isTeacher,
    teacherLoading,
    isFormTeacher,
    isClassRestricted,
    assignedClass,
  ]);

  // Fetch classes for this school. Form Teachers only get their assigned class.
  useEffect(() => {
    if (!currentSchoolId) {
      setClassOptions([]);
      return;
    }

    if (isTeacher && teacherLoading) return;

    if (isTeacher && isFormTeacher) {
      setClassOptions(assignedClass ? [assignedClass] : []);
      return;
    }

    const classesQuery = query(
      collection(db, "Classes"),
      where("schoolId", "==", currentSchoolId)
    );

    const unsubscribe = onSnapshot(
      classesQuery,
      (snapshot) => {
        const options = [
          ...new Set(
            snapshot.docs
              .map((classDoc) => classDoc.data().className)
              .filter(Boolean)
          ),
        ].sort((a, b) => a.localeCompare(b));

        setClassOptions(options);
      },
      (error) => {
        console.error("Firestore Classes listener failed:", error);
        toast.error("Failed to fetch class data.");
      }
    );

    return () => unsubscribe();
  }, [
    currentSchoolId,
    isTeacher,
    teacherLoading,
    isFormTeacher,
    assignedClass,
  ]);

  // Fetch pupil access types for this school.
  useEffect(() => {
    if (!currentSchoolId) {
      setAccessTypeOptions([]);
      return;
    }

    const accessQuery = query(
      collection(db, "SchoolAccess"),
      where("schoolId", "==", currentSchoolId)
    );

    const unsubscribe = onSnapshot(
      accessQuery,
      (snapshot) => {
        const options = [
          ...new Set(
            snapshot.docs
              .flatMap((accessDoc) => accessDoc.data().accessType || [])
              .filter(Boolean)
          ),
        ].sort((a, b) => a.localeCompare(b));

        setAccessTypeOptions(options);
      },
      (error) => {
        console.error("Firestore SchoolAccess listener failed:", error);
        toast.error("Failed to fetch pupil access types.");
      }
    );

    return () => unsubscribe();
  }, [currentSchoolId]);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return users
      .filter((pupil) => {
        if (!term) return true;

        return [
          pupil.studentName,
          pupil.class,
          pupil.studentID,
          pupil.gender,
          pupil.academicYear,
        ].some((value) =>
          String(value || "").toLowerCase().includes(term)
        );
      })
      .sort((a, b) =>
        String(a.studentName || "").localeCompare(
          String(b.studentName || "")
        )
      );
  }, [users, searchTerm]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleUploadSuccess = (url, publicId) => {
    setFormData((previous) => ({
      ...previous,
      userPhoto: url,
      userPublicId: publicId,
    }));
    toast.success("Image uploaded successfully!");
  };

  const handleCameraCapture = async (base64Data) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await fetch(base64Data);
      const blob = await response.blob();

      if (blob.size > MAX_FILE_SIZE) {
        toast.error("Image is too large. Maximum size is 5MB.");
        setIsUploading(false);
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          setUploadProgress(
            Math.round((event.loaded * 100) / event.total)
          );
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        setIsUploading(false);
        setShowCamera(false);

        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            handleUploadSuccess(result.secure_url, result.public_id);
          } catch (error) {
            console.error("Could not parse Cloudinary response:", error);
            toast.error("The image upload response was invalid.");
          }
        } else {
          toast.error("Camera upload failed. Please try again.");
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        setShowCamera(false);
        toast.error("Network error while uploading the photo.");
      };

      const uploadData = new FormData();
      uploadData.append("file", blob);
      uploadData.append("upload_preset", UPLOAD_PRESET);
      uploadData.append("folder", "SchoolAppPupils/Uploads");

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
      );
      xhr.send(uploadData);
    } catch (error) {
      console.error("Camera upload failed:", error);
      toast.error("Failed to upload image from camera.");
      setIsUploading(false);
      setShowCamera(false);
    }
  };

  const handleClearForm = (showMessage = true) => {
    setFormData(createEmptyForm(currentSchoolId, registeredBy));
    setOriginalAcademicInfo(null);
    setSelectedPupilId(null);

    if (showMessage) {
      toast.info("Form cleared. Select a pupil from the list to update.");
    }
  };

  const handleUpdate = (pupil) => {
    // Extra UI-level check; Firestore rules must enforce access too.
    if (
      isTeacher &&
      isFormTeacher &&
      (!assignedClass || pupil.class !== assignedClass)
    ) {
      toast.error("You can only update pupils in your assigned class.");
      return;
    }

    if (pupil.schoolId !== currentSchoolId) {
      toast.error("You can only update pupils from your school.");
      return;
    }

    setSelectedPupilId(pupil.id);
    setOriginalAcademicInfo({
      class: pupil.class || "",
      academicYear: pupil.academicYear || "",
    });

    setFormData({
      id: pupil.id,
      studentID: pupil.studentID ?? null,
      studentName: pupil.studentName || "",
      dob: pupil.dob || "",
      age: pupil.age || calculateAge(pupil.dob),
      gender: pupil.gender || "",
      addressLine1: pupil.addressLine1 || "",
      addressLine2: pupil.addressLine2 || "",
      parentName: pupil.parentName || "",
      parentPhone: pupil.parentPhone || "",
      class: pupil.class || "",
      academicYear: pupil.academicYear || "",
      registrationDate: pupil.registrationDate || getToday(),
      registeredBy: pupil.registeredBy || registeredBy,
      userPhoto: pupil.userPhotoUrl || pupil.userPhoto || null,
      userPublicId: pupil.userPublicId || null,
      pupilType: pupil.pupilType || "",
      schoolId: pupil.schoolId || currentSchoolId,
    });

    toast.info(`Editing pupil: ${pupil.studentName || pupil.studentID}`);
  };

  const handleUpdateSubmission = async (event) => {
    event.preventDefault();

    if (!currentSchoolId) {
      toast.error("School information is missing. Please log in again.");
      return;
    }

    if (!formData.id) {
      toast.error("Select a pupil from the table below before updating.");
      return;
    }

    // Ensure the selected record is still in the allowed live pupil list.
    const selectedPupil = users.find((pupil) => pupil.id === formData.id);

    if (!selectedPupil || selectedPupil.schoolId !== currentSchoolId) {
      toast.error("This pupil is not available in your school.");
      return;
    }

    if (
      isTeacher &&
      isFormTeacher &&
      (!assignedClass ||
        selectedPupil.class !== assignedClass ||
        formData.class !== assignedClass)
    ) {
      toast.error("You can only update pupils in your assigned class.");
      return;
    }

    if (!formData.studentName.trim()) {
      toast.error("Student name is required.");
      return;
    }

    if (!String(formData.class || "").trim()) {
      toast.error("Class is required.");
      return;
    }

    if (!String(formData.academicYear || "").trim()) {
      toast.error("Academic year is required.");
      return;
    }

    if (!String(formData.pupilType || "").trim()) {
      toast.error("Pupil type is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const studentData = {
        studentID: formData.studentID,
        studentName: formData.studentName.toUpperCase().trim(),
        dob: formData.dob,
        age: calculateAge(formData.dob),
        gender: formData.gender,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        class: formData.class,
        academicYear: formData.academicYear,
        registrationDate: formData.registrationDate,
        registeredBy: formData.registeredBy,
        userPhotoUrl: formData.userPhoto || "",
        userPublicId: formData.userPublicId || "",
        pupilType: formData.pupilType,
        // Never accept a different school ID from form state.
        schoolId: currentSchoolId,
      };

      await updateDoc(doc(db, "PupilsReg", formData.id), studentData);

      toast.success("Pupil updated successfully!");
      handleClearForm(false);
    } catch (error) {
      console.error("Failed to update pupil:", error);
      toast.error("Failed to update pupil. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const teacherName =
    liveTeacherInfo?.teacherName ||
    user?.data?.teacherName ||
    user?.data?.name ||
    user?.name ||
    "Teacher";

  if (!currentSchoolId) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          School information is missing. Please log in again.
        </div>
      </div>
    );
  }

  if (isTeacher && teacherLoading) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-center text-gray-600">
        Loading teacher information...
      </div>
    );
  }

  if (isTeacher && isFormTeacher && !assignedClass) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
          No class is assigned to your teacher account. Please contact the school administrator.
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center space-y-6 bg-gray-100 p-4 md:p-6">
      {isTeacher && (
        <div className="w-full max-w-4xl rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            <strong>Teacher:</strong> {teacherName}
          </p>
          <p className="mt-1 text-sm text-blue-900">
            <strong>School ID:</strong> {currentSchoolId}
          </p>
          {isFormTeacher && (
            <p className="mt-1 text-sm text-blue-900">
              <strong>Assigned Class:</strong> {assignedClass}
            </p>
          )}
          {isClassRestricted && (
            <p className="mt-2 text-xs text-blue-700">
              You can only view and update pupils in your assigned class.
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleUpdateSubmission}
        className="w-full max-w-4xl rounded-2xl bg-white p-5 shadow-lg md:p-6"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          {formData.id
            ? `Updating Pupil: ${formData.studentName}`
            : "Pupil Update & Search"}
        </h2>

        <p className="mb-4 text-center text-sm font-semibold text-red-500">
          Select a pupil from the table below before updating their information.
        </p>

        <h3 className="mb-2 mt-4 text-lg font-semibold text-gray-800">
          Student Core Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Student ID</label>
            <input
              type="text"
              value={formData.studentID || "N/A"}
              readOnly
              disabled
              className="mb-2 w-full rounded-lg border bg-gray-100 p-2"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              disabled={!formData.id}
              required
              className="mb-2 w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              disabled={!formData.id}
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Age</label>
            <input
              type="text"
              value={formData.age}
              readOnly
              disabled
              className="w-full rounded-lg border bg-gray-100 p-2"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!formData.id}
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <h3 className="mb-2 mt-6 border-t pt-4 text-lg font-semibold text-gray-800">
          Academic & System Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              disabled={!formData.id || isClassRestricted}
              required
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            >
              <option value="">Select Class</option>
              {formData.class && !classOptions.includes(formData.class) && (
                <option value={formData.class}>{formData.class}</option>
              )}
              {classOptions.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
            {formData.id && originalAcademicInfo && (
              <p className="mt-1 text-xs text-gray-500">
                Previous class:{" "}
                <span className="font-semibold text-blue-600">
                  {originalAcademicInfo.class}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Academic Year</label>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              disabled={!formData.id}
              required
              placeholder="e.g. 2026/2027"
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
            {formData.id && originalAcademicInfo && (
              <p className="mt-1 text-xs text-gray-500">
                Previous year:{" "}
                <span className="font-semibold text-blue-600">
                  {originalAcademicInfo.academicYear}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Registration Date</label>
            <input
              type="date"
              name="registrationDate"
              value={formData.registrationDate}
              onChange={handleInputChange}
              disabled={!formData.id}
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Pupil Type</label>
            <select
              name="pupilType"
              value={formData.pupilType}
              onChange={handleInputChange}
              disabled={!formData.id}
              required
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            >
              <option value="">
                {accessTypeOptions.length ? "Select Type" : "No types available"}
              </option>
              {formData.pupilType &&
                !accessTypeOptions.includes(formData.pupilType) && (
                  <option value={formData.pupilType}>{formData.pupilType}</option>
                )}
              {accessTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h3 className="mb-3 mt-6 border-t pt-4 text-lg font-semibold text-gray-800">
          Parent and Address Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Address Line 1</label>
            <input
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              disabled={!formData.id}
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Address Line 2</label>
            <input
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              disabled={!formData.id}
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Parent/Guardian Name</label>
            <input
              name="parentName"
              value={formData.parentName}
              onChange={handleInputChange}
              disabled={!formData.id}
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Parent/Guardian Phone</label>
            <input
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleInputChange}
              disabled={!formData.id}
              className="w-full rounded-lg border p-2 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="mb-4 mt-6 flex flex-col items-center border-t pt-4">
          <label className="mb-2 block text-sm font-medium">Student Photo</label>
          <div className="mb-3 flex h-48 w-36 items-center justify-center overflow-hidden border-4 border-dashed bg-gray-50">
            {formData.userPhoto ? (
              <img
                src={formData.userPhoto}
                alt="Pupil"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-400">2-inch Photo</span>
            )}
          </div>

          <div className="w-full max-w-sm">
            <CloudinaryImageUploader
              onUploadSuccess={handleUploadSuccess}
              onUploadStart={() => {
                setIsUploading(true);
                setUploadProgress(0);
              }}
              onUploadProgress={setUploadProgress}
              onUploadComplete={() => setIsUploading(false)}
              disabled={!formData.id || isUploading}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowCamera(true)}
            disabled={isUploading || !formData.id}
            className="mt-3 rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            Use Camera
          </button>

          {isUploading && (
            <div className="mt-3 h-2 w-full max-w-sm rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-indigo-500"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading || !formData.id}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Updating..." : "Update Pupil"}
        </button>

        <button
          type="button"
          onClick={() => handleClearForm(true)}
          disabled={isSubmitting || isUploading}
          className="mt-2 w-full rounded-lg bg-gray-500 p-3 font-semibold text-white transition hover:bg-gray-600 disabled:bg-gray-400"
        >
          Clear Form / Cancel Edit
        </button>
      </form>

      {showCamera && (
        <CameraCapture
          setPhoto={handleCameraCapture}
          onClose={() => setShowCamera(false)}
          initialFacingMode="user"
        />
      )}

      <div className="w-full max-w-6xl rounded-2xl bg-white p-5 shadow-lg md:p-6">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:text-2xl">
          Select Pupil for Update ({filteredUsers.length} total)
        </h2>

        <input
          type="text"
          placeholder="Search by pupil name, ID, class, gender, or academic year"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="mb-5 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
        />

        {pupilsLoading ? (
          <div className="p-8 text-center text-gray-500">Loading pupils...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Student ID
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Name
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-medium uppercase text-gray-500 md:table-cell">
                    Class
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-medium uppercase text-gray-500 md:table-cell">
                    Gender
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-medium uppercase text-gray-500 lg:table-cell">
                    Academic Year
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Photo
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((pupil) => (
                  <tr
                    key={pupil.id}
                    className={
                      pupil.id === selectedPupilId
                        ? "bg-yellow-100 hover:bg-yellow-200"
                        : "bg-white hover:bg-gray-50"
                    }
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-900">
                      {pupil.studentID || "-"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-blue-700">
                      {pupil.studentName || "-"}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-3 text-sm text-gray-500 md:table-cell">
                      {pupil.class || "-"}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-3 text-sm text-gray-500 md:table-cell">
                      {pupil.gender || "-"}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-3 text-sm text-gray-500 lg:table-cell">
                      {pupil.academicYear || "-"}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      {pupil.userPhotoUrl || pupil.userPhoto ? (
                        <img
                          src={pupil.userPhotoUrl || pupil.userPhoto}
                          alt={pupil.studentName || "Pupil"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleUpdate(pupil)}
                        className="rounded px-2 py-1 font-semibold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-3 py-8 text-center text-gray-500"
                    >
                      No pupils found for this school matching the search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PupilUpdate;
