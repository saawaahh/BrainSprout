export default function BackButton() {
  return (
    <div>
      <div className="absolute left-4 top-12">
        <div className="h-12 rounded-lg border-2 border-slate-500 bg-white px-2">
          <button className="flex h-full w-full items-center justify-center">
            &lt; Back
          </button>
        </div>
      </div>
    </div>
  );
}
