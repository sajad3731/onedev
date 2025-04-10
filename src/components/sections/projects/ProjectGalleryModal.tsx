"use client";

import { FC, useEffect, useRef } from "react";
import Image from "next/image";

interface ProjectGalleryModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectGalleryModal: FC<ProjectGalleryModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg max-w-4xl w-full mx-4 overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">{project.title} - Gallery</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="relative h-48 rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
          <p className="text-gray-600 mb-4">
            {project.status === "launched"
              ? "Detailed view of the project showing the main features and user interface elements."
              : "Concept designs and mockups for this upcoming project."}
          </p>
        </div>
      </div>
    </div>
  );
};
