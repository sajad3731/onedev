"use client";

import { Dialog, DialogProps } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

interface ProjectGalleryDialog extends DialogProps {
  selectedProject: Project | null;
}

export const ProjectGalleryModal: FC<ProjectGalleryDialog> = ({
  selectedProject,
  ...dialogProps
}) => {
  return (
    <Dialog {...dialogProps}>
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-xl font-semibold">
          {selectedProject?.title} - Gallery
        </h3>
        {/* <button
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
        </button> */}
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {selectedProject?.images.map((image, index) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`${selectedProject?.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
        <p className="text-gray-600 mb-4">
          {selectedProject?.status === "launched"
            ? "Detailed view of the selectedProject showing the main features and user interface elements."
            : "Concept designs and mockups for this upcoming selectedProject?."}
        </p>
      </div>
    </Dialog>
  );
};
