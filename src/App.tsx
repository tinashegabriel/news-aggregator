
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import ArticleCard from './components/ArticleCard';
import Loader from './components/Loarder';
import './styles.css';
import SideBar from './components/Sidebar';
import { ApiResponse, Article, GuardianResponse, NYTResponse, Preferences } from 'types';


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
  const [isOpen, setIsOpen] = useState(true);

  const fetchNewsAPI = async () => {
    const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
    let url = `https://newsapi.org/v2/top-headlines?q=${searchQuery}s&apiKey=${apiKey}`;

      try {
        const response = await axios.get<ApiResponse>(url);
        return response.data.articles;
      } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
  };

  const fetchNewsAPIEveryThing = async () => {
    const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
    let url = `https://newsapi.org/v2/everything?q=${searchQuery}s&apiKey=${apiKey}`;

      try {
        const response = await axios.get<ApiResponse>(url);
        return response.data.articles;
      } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
      }
  };

  const fetchGuardianAPI = async () => {
    const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    const url = `https://content.guardianapis.com/search?q=${searchQuery}&api-key=${apiKey}`;

    try {
      const response = await axios.get<GuardianResponse>(url);
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
    const apiKey = process.env.REACT_APP_NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${searchQuery}&api-key=${apiKey}`;
    try {
      const response = await axios.get<NYTResponse>(url);
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
    setArticles([...newsAPIArticles, ...newsAPIArticlesEverything,, ...guardianArticles, ...nytArticles]);
    setLoadedArticles([...newsAPIArticles, ...newsAPIArticlesEverything, ...guardianArticles, ...nytArticles]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery]);

  useEffect(() => {
    const formattedDate: string = filters.date ? new Date(filters.date).toLocaleDateString("en-GB") : "N/A";
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

  useEffect(() => {
    const savedPreferences = localStorage.getItem("newsPreferences");
  
    if (savedPreferences) {
      try {
        const parsedPreferences: Preferences = JSON.parse(savedPreferences);

        if (parsedPreferences.sources && parsedPreferences.sources.length > 0) {
          const filteredArticles = loaledArticles.filter((article) =>
            parsedPreferences.sources.some(
              (source) => source.toLowerCase() === article.source.name.toLowerCase()
            )
          );
  
          setArticles(filteredArticles);
        } else {
          setArticles(loaledArticles);
        }
      } catch (error) {
        console.error("Error parsing savedPreferences:", error);
        setArticles(loaledArticles);
      }
    } else {
      setArticles(loaledArticles);
    }
  }, [loaledArticles]);


  return (
    <div  className={isOpen ? "app" : "appClose"}>
      <Header onOpenSideBar={() => setIsOpen(!isOpen)} />
      <div className="main-content">
        {
          isOpen && (
            <SideBar preferences={preferences} setPreferences={setPreferences} articles={loaledArticles} closeSidebar={() => setIsOpen(false)}/>
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