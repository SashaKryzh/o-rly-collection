import { sendGAEvent } from "~/components/meta/GoogleAnalytics";
import { api } from "~/utils/api";
import { useEffect } from "react";

export const useObserveImageCopy = () => {
  const { mutate: observeImageCopy } = api.observation.image_copy.useMutation();

  return (imageName: string) => {
    observeImageCopy({ imageName });
    sendGAEvent({
      action: "image_copy",
      category: "image",
      label: "Image Copy",
      value: imageName,
    });
  };
};

export const useObserveSearchEffect = (searchTerm: string) => {
  const { mutate: observeSearch } = api.observation.user_search.useMutation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        observeSearch({ query: searchTerm });
        sendGAEvent({
          action: "user_search",
          category: "search",
          label: "User Search",
          value: searchTerm,
        });
      }
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timeoutId); // Clear timeout if searchTerm changes
  }, [searchTerm, observeSearch]);
};

export const useObserveImageView = () => {
  const { mutate: observeImageView } = api.observation.image_view.useMutation();

  return (imageName: string) => {
    observeImageView({ imageName });
    sendGAEvent({
      action: "image_view",
      category: "image",
      label: "Image View",
      value: imageName,
    });
  };
};