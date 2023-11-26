"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useState, ChangeEvent, useEffect } from "react";
import Loading from "./Loading";

export default function JournalEntryInput() {
  const [isEditMode, setIsEditMode] = useState(true);
  //   const [text, setText] = useState("");

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setJournalEntry(event.target.value);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const { status: sessionStatus } = useSession();
  const { replace } = useRouter();

  const [journalEntry, setJournalEntry] = useState("");

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return <Loading />;
  }
  return (
    <div className="relative h-full">
      {isEditMode ? (
        <div className="relative h-full">
          <label
            htmlFor="comment"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            November 20th, 2023
          </label>
          <div className="mt-2 h-full">
            <textarea
              //   onChange={handleTextChange}
              rows={4}
              name="comment"
              id="comment"
              placeholder="How are you feeling?"
              className="block h-full w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={journalEntry}
              onChange={handleTextChange}
              required
            />
          </div>
          <div className="absolute -bottom-4 right-6">
            <button
              onClick={handleSave}
              type="submit"
              className=" inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Entry
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>{journalEntry}</div>
          <button
            onClick={handleEdit}
            type="submit"
            className=" inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit Entry
          </button>
        </div>
      )}
    </div>
  );
}
