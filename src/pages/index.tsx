import OrlyFooter from "~/components/OrlyFooter";
import OrlyHead from "~/components/meta/OrlyHead";
import { motion } from "framer-motion";
import { ImagePreviewProvider } from "~/components/ImagePreview";
import { env } from "~/env.js";
import Link from "next/link";
import BookTile from "~/components/BookTile";
import SearchBar from "~/components/SearchBar";
import useImageCopy from "~/hooks/useImageCopy";
import {
  useObserveSearchEffect,
  useObserveSortModeEffect,
} from "~/hooks/useObservabilityEvents";
import useImageView from "~/hooks/useImageView";
import useBookSearch from "~/hooks/useBookSearch";
import SortSelect from "~/components/SortSelect";
import { Toaster } from "~/components/ui/sonner";
import RefreshButton from "~/components/RefreshButton";
import SearchPills from "~/components/SearchPills";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <OrlyHead />
      <ImagePreviewProvider>
        <BookSearch />
      </ImagePreviewProvider>
      <Toaster richColors closeButton theme="light" />
      <OrlyFooter />
    </div>
  );
}

const BookSearch = () => {
  const {
    booksToShow,
    searchTerm,
    setSearchTerm,
    sortMode,
    setSortMode,
    keywords,
    refreshKeywords,
  } = useBookSearch(8);

  useObserveSearchEffect(searchTerm);
  useObserveSortModeEffect(sortMode);
  const imageCopyHandler = useImageCopy();
  const imageViewHandler = useImageView();

  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex w-full flex-col items-center">
          <Heading />
          <div className="mb-4 flex w-full justify-center gap-4">
            <SearchBar
              className="w-full max-w-lg"
              value={searchTerm}
              onInputChange={setSearchTerm}
            />
            <SortSelect value={sortMode} onSortModeChange={setSortMode} />
          </div>
          <div className="mb-10 flex w-full justify-between">
            <div className="flex w-full flex-wrap items-center gap-2">
              <SearchPills
                keywords={keywords}
                onKeywordClick={(keyword) => setSearchTerm(keyword)}
              />
            </div>
            <RefreshButton onRefresh={refreshKeywords} />
          </div>
        </div>
        {booksToShow && booksToShow.length !== 0 ? (
          <motion.div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {booksToShow.map((book) => {
              const imageId = book.image;
              const imageUrl = `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`;
              const bookTitle = book.title;
              const bookAlt = book.title + " | " + book.headline;

              return (
                <BookTile
                  key={imageId}
                  title={bookTitle}
                  alt={bookAlt}
                  imageUrl={imageUrl}
                  onCopyClick={() => void imageCopyHandler(imageId, imageUrl)}
                  onImageClick={() => void imageViewHandler(imageId, imageUrl)}
                />
              );
            })}
          </motion.div>
        ) : (
          <NoResultsMessage />
        )}
      </div>
    </main>
  );
};

const Heading = () => {
  return (
    <>
      <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-black">
        Search O&apos;RLY Covers
      </h1>
      <p className="mb-16 text-center font-mono tracking-tight text-gray-600">
        Strengthen your{" "}
        <span className="underline decoration-blue-400 decoration-2 underline-offset-2">
          arguments
        </span>{" "}
        with compelling programming book covers
      </p>
    </>
  );
};

const NoResultsMessage = () => {
  return (
    <div className="py-20 text-center font-mono">
      <p className="text-gray-500">
        Try another keyword or{" "}
        <Link
          href="https://orly.nanmu.me/"
          className="font-bold decoration-blue-400 decoration-2 hover:underline"
        >
          create your own cover
        </Link>
      </p>
    </div>
  );
};
