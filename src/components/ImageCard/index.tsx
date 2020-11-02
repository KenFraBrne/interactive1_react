import React from 'react';

interface Image {
  title: string;
  description: string;
  publishedOn: string;
  authorScreenName: string;
  thumbnailUrls: {
    imedia_300: string;
    imedia_1024: string;
    imedia_2048: string;
  }
}

interface Props {
  image: number;
}

function ImageCard(props: Props) {

  const { image } = props;

  return (
    <div className="card">
      Slika {props.image}
    </div>
  );
}

export default ImageCard;
