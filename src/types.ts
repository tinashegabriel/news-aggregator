export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    source: {
      name: string;
    };
  }

export interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

export interface GuardianResponse {
  response: {
    results: any[];
  };
}
export interface NYTResponse {
  response: {
    docs: any[];
  };
}

export interface ApiResponse {
  articles: any[]; 
}
