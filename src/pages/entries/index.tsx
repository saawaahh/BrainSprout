import NoEntries from "@/components/NoEntries";
import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
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

      <div className="relative h-screen bg-slate-400">
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
      </div>
    </>
  );
};

export default Entries;
