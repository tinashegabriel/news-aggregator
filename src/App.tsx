
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import ArticleCard from './components/ArticleCard';
import Sidebar from './components/Sidebar';
import Loader from './components/Loarder';
import './styles.css';
import SideBar from './components/Sidebar';

interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

interface Article {
  title: string;
  source: { name: string };
  description: string;
  urlToImage: string;
  publishedAt: string;
  url: string;
}


const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loaledArticles, setLoadedArticles] = useState<Article[]>([]);
  const [filters, setFilters] = useState<{ date: Date | null; category: string; source: string }>({
    date: null, 
    category: '',
    source: '',
  });
  const [preferences, setPreferences] = useState<Preferences>({
    sources: [],
    categories: [],
    authors: [],
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNewsAPI = async () => {
    const apiKey = 'YOUR_NEWSAPI_KEY';
    const fromDate = filters.date ? filters.date.toISOString().split('T')[0] : '';
    let url = `https://newsapi.org/v2/top-headlines?q=${searchQuery}s&apiKey=d9dc5f3e262d471e97f697b5e9512e9b`;

      try {
        const response = await axios.get(url);
        return response.data.articles;
      } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
  };

  const fetchNewsAPIEveryThing = async () => {
    const apiKey = 'YOUR_NEWSAPI_KEY';
    const fromDate = filters.date ? filters.date.toISOString().split('T')[0] : '';
    let url = `https://newsapi.org/v2/everything?q=${searchQuery}s&apiKey=d9dc5f3e262d471e97f697b5e9512e9b`;

      try {
        const response = await axios.get(url);
        return response.data.articles;
      } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
  };

  const fetchGuardianAPI = async () => {
    const apiKey = 'YOUR_GUARDIAN_API_KEY';
    const fromDate = filters.date ? filters.date.toISOString().split('T')[0] : '';
    const url = `https://content.guardianapis.com/search?q=${searchQuery}&api-key=fbf5ffe3-54c0-4142-bd6a-d131303ada4e`;

    try {
      const response = await axios.get(url);
      console.log('Testing GuardianAPI!!!', response.data.response.results);
      return response.data.response.results.map((article: any) => ({
        title: article.webTitle,
        source: { name: 'The Guardian' },
        description: '',
        urlToImage: '',
        publishedAt: article.webPublicationDate,
        url: article.webUrl,
      }));
    } catch (error) {
      console.error('Error fetching Guardian articles:', error);
      return [];
    }
  };

  const fetchNYTAPI = async () => {
    const apiKey = 'YOUR_NYT_API_KEY';
    const fromDate = filters.date ? filters.date.toISOString().split('T')[0] : '';
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${searchQuery}&api-key=NtXTS3AtE0K9oEDAVuFt1T3UtYJm6zju`;

    try {
      const response = await axios.get(url);
      console.log('Testing !!!', response.data.response.docs);
      return response.data.response.docs.map((article: any) => ({
        title: article.headline.main,
        source: { name: 'The New York Times' },
        description: article.snippet,
        urlToImage: article.multimedia.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : '',
        publishedAt: article.pub_date,
        url: article.web_url,
      }));
    } catch (error) {
      console.error('Error fetching NYT articles:', error);
      return [];
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    const [newsAPIArticles, newsAPIArticlesEverything,  guardianArticles, nytArticles] = await Promise.all([
      fetchNewsAPI(),
      fetchNewsAPIEveryThing(),
      fetchGuardianAPI(),
      fetchNYTAPI(),
    ]);
    console.log('News API Articles ===> ',newsAPIArticles);
    console.log('Next');
    console.log('The Guardian Articles API ===>',guardianArticles);
    console.log('Next');
    console.log('Nyt API',nytArticles);
    setArticles([...newsAPIArticles, ...newsAPIArticles, ...guardianArticles, ...nytArticles]);
    setLoadedArticles([...newsAPIArticles, ...guardianArticles, ...nytArticles]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery]);

  useEffect(() => {
    console.log('The filters ====> ',filters);
    const formattedDate: string = filters.date ? new Date(filters.date).toLocaleDateString("en-GB") : "N/A";
      console.log('Formatted date ', formattedDate);
    if (filters.source === ''){
      setArticles(loaledArticles)
    }else{
      const filteredArticles = loaledArticles.filter(article => {
        const articleDate = new Date(article.publishedAt).toLocaleDateString("en-GB");
        return (
          article.source.name.toLowerCase() === filters.source.toLowerCase() &&
          articleDate === formattedDate
        );
      });
      setArticles(filteredArticles);
    }
    
  }, [filters]);


  return (
    <div  className={isOpen ? "app" : "appClose"}>
      <Header onOpenSideBar={() => setIsOpen(!isOpen)} />
      <div className="main-content">
        {/* <SideBar /> */}
        {
          isOpen && (
            <SideBar preferences={preferences} setPreferences={setPreferences} articles={loaledArticles}/>
          )
        }
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          articles={loaledArticles}
        />
        <div className="news-feed">
          {loading ? (
            <Loader />
          ) : (
            articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;