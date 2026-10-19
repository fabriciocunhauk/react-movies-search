export interface Movie {
  readonly id: number;
  readonly title: string;
  readonly overview: string;
  readonly posterPath: string | null;
  readonly backdropPath: string | null;
  readonly releaseDate: string;
  readonly voteAverage: number;
}

export interface Video {
  readonly key: string;
  readonly site: string;
  readonly type: string;
  readonly official: boolean;
}
