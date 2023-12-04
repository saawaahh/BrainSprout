import NoEntries from "@/components/NoEntries";
import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import EntryListItem from "@/components/EntryListItem";

const Entries = () => {
  const { status: sessionStatus } = useSession();
  const { replace } = useRouter();

  const { data: entriesData } = api.journalling.getAllEntries.useQuery(
    undefined,
    {
      enabled: sessionStatus === "authenticated",
    },
  );

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Entries</title>
      </Head>

      <section className="mt-32 flex flex-col justify-center gap-10">
        <h1 className="font-poppins text-center text-4xl font-bold text-neutral-50">
          Entries
        </h1>
        {entriesData?.length === 0 ? (
          <NoEntries />
        ) : (
          entriesData?.map((entry) => (
            <Link
              href={`/entries/${entry.id}`}
              key={entry.id}
              className="mx-auto flex w-1/2 flex-row rounded-sm bg-emerald-950 p-10"
            >
              <div className="truncate">
                <p className="font-poppins text-lg text-gray-50">
                  {entry.content}
                </p>
                <p className="font-montserrat text-emerald-950">
                  {moment(entry.dateCreated).format("MMM Do YYYY")}
                </p>
              </div>
            </Link>
          ))
        )}
      </section>
      {/* <div className="relative h-screen bg-slate-400">
        <div className="flex h-1/6 items-center justify-center px-14 text-center text-4xl">
          <div>
            <div>Entries</div>
          </div>
        </div>
        <div className="h-5/6 overflow-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <EntryListItem key={index} />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Entries;
