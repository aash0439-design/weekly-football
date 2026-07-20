export type CommunityGalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  title: string;
  detail: string;
};

// Keep photo data separate from the gallery UI. Replace this list with a
// Supabase Storage query later and pass the result to <CommunityGallery />.
export const communityGalleryPhotos: CommunityGalleryPhoto[] = [
  { id: "match-01", src: "/images/community-gallery/weekly-footy-01.jpg", alt: "Weekly Footy players lining up before kick-off", title: "Friday under the lights" },
  { id: "match-02", src: "/images/community-gallery/weekly-footy-02.jpg", alt: "Weekly Footy player controlling the ball during a match", title: "First touch"},
  { id: "match-03", src: "/images/community-gallery/weekly-footy-03.jpg", alt: "Weekly Footy teammates celebrating a goal", title: "The equaliser" },
  { id: "match-04", src: "/images/community-gallery/weekly-footy-04.jpg", alt: "Weekly Footy goalkeeper making a save", title: "Between the posts",},
  { id: "match-05", src: "/images/community-gallery/weekly-footy-05.jpg", alt: "Weekly Footy players competing for the ball", title: "No easy yards" },
  { id: "match-06", src: "/images/community-gallery/weekly-footy-06.jpg", alt: "Weekly Footy players sharing a post-match moment", title: "After the whistle" },
  { id: "match-07", src: "/images/community-gallery/weekly-footy-07.jpg", alt: "Weekly Footy team photo after a match", title: "The full-time photo" },
  { id: "match-08", src: "/images/community-gallery/weekly-footy-08.jpg", alt: "Weekly Footy players walking onto the pitch", title: "Ready for ninety" },
];
