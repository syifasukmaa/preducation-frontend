"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchButton from "@/components/button/SearchButton";
import FilterButton from "@/components/button/FilterButton";
import FilterPopup from "@/components/popup/FilterPopup";
import SearchPopup from "@/components/popup/SearchPopup";
import AddButton from "@/components/button/AddButton";
import ActionButton from "@/components/button/ActionButton";
import Checkbox from "./components/Checkbox";
import ModalCourse from "./components/ModalCourse";
import { useSession } from "next-auth/react";
import { useCourse } from "@/utils/swr";

export default function Page() {
  const [title, setTitle] = useState("");
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const router = useRouter();
  const { course: courses, isLoading, mutate } = useCourse(token, null, "", title);

  const goToChapter = (chapterId) => {
    router.push(`/admin/course/chapter/${chapterId}`);
  };

  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
  });

  const [editMode, setEditMode] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleEditCourse = () => {
    setEditMode(true);
    setShowModal(true);
  };

  const handleAddCourse = () => {
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold">Kelola Kelas</p>
        <div className="flex items-center relative">
          <AddButton onClick={() => handleAddCourse()} />

          <FilterButton onClick={() => setShowElements({ ...showElements, showFilter: true })} />

          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />

          {showElements.showInput && (
            <SearchPopup
              onClick={() => setShowElements({ ...showElements, showInput: false })}
              title={title}
              setTitle={setTitle}
            />
          )}
        </div>

        {showElements.showFilter && (
          <FilterPopup clickClose={() => setShowElements({ ...showElements, showFilter: false })}>
            <Checkbox label="Data Science" />
            <Checkbox label="Web Development" />
            <Checkbox label="Android Development" />
            <Checkbox label="UI/UX Design" />
            <Checkbox label="Product Management" />
          </FilterPopup>
        )}
      </div>

      <div className="overflow-x-auto mt-4 mb-24 lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-light-blue-05 font-semibold text-neutral-05 text-xs">
              <tr>
                <td className="py-3 px-4">Kode Kelas</td>
                <td className="py-3 px-4">Kategori</td>
                <td className="py-3 px-4">Nama Kelas</td>
                <td className="py-3 px-4">Tipe Kelas</td>
                <td className="py-3 px-4">Level</td>
                <td className="py-3 px-4">Harga Kelas</td>
                <td className="py-3 px-4">Aksi</td>
              </tr>
            </thead>
            {isLoading ? (
              <p>Loading</p>
            ) : (
              <tbody className="text-gray-700  text-[10px]">
                {courses?.map((course) => (
                  <tr key={course._id}>
                    <td className="py-4 px-4 font-bold text-gray-05">{course.classCode}</td>
                    <td className="py-3 px-4 font-bold text-gray-05 w-[10%]">{course.category.name}</td>
                    <td className="py-3 px-4 font-bold text-gray-04 lg:whitespace-nowrap whitespace-pre-wrap">
                      {course.title}
                    </td>
                    <td
                      className={`py-3 px-4 font-bold ${
                        course.TipeKelas === "PREMIUM" ? "text-dark-blue-05" : "text-alert-green"
                      }`}
                    >
                      {course.typeClass}
                    </td>
                    <td className="py-3 px-4 font-bold text-black w-[12%]">{course.level}</td>
                    <td className="py-3 px-4 font-bold text-black">Rp {course.price}</td>
                    <td className="py-3 px-4 font-bold">
                      <ActionButton
                        styles={"bg-alert-green hover:border-alert-green"}
                        onClick={() => goToChapter(course.id)}
                      >
                        Chapter
                      </ActionButton>
                      <ActionButton
                        styles={"bg-dark-blue-05 hover:border-dark-blue-05"}
                        onClick={() => handleEditCourse()}
                      >
                        Ubah
                      </ActionButton>
                      <ActionButton styles={"bg-alert-red hover:border-alert-red"}>Hapus</ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {showModal && <ModalCourse onClose={() => setShowModal(false)} editMode={editMode} />}
    </div>
  );
}
