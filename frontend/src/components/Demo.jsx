import React from "react";
import {
  MDBMultiCarousel,
  MDBMultiCarouselItem,
} from "mdb-react-multi-carousel";
import { MDBLightbox } from "mdb-react-ui-kit";
// import { useAppDemo } from "../context/AppContext";
// import { useAdmin } from "../context/AdminContext";

export default function Demo() {
  // const adminContext = useAdmin();
  // const appContext = useAppDemo();

  return (
    <MDBLightbox>
      <MDBMultiCarousel lightbox>
        <MDBMultiCarouselItem
          src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/1.webp"
          fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.webp"
          alt="Table Full of Spices"
        />
        <MDBMultiCarouselItem
          src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/2.webp"
          fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/2.webp"
          alt="Winter Landscape"
        />
        <MDBMultiCarouselItem
          src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/3.webp"
          fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/3.webp"
          alt="View of the City in the Mountains"
        />
        <MDBMultiCarouselItem
          src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/4.webp"
          fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp"
          alt="Place Royale Bruxelles"
        />
      </MDBMultiCarousel>
    </MDBLightbox>
  );
}
