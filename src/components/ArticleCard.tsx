import React from 'react';
import styles from '../styles/ArticleCard.module.css';
import { Article } from 'types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {article.urlToImage ? (
          <img src={article.urlToImage} alt={article.title} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#e2e8f0" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5ZM6 5H18V19H6V5ZM15.5 9C15.5 10.3807 14.3807 11.5 13 11.5C11.6193 11.5 10.5 10.3807 10.5 9C10.5 7.61929 11.6193 6.5 13 6.5C14.3807 6.5 15.5 7.61929 15.5 9ZM16 15.5L13 12.5L10 15.5L7 12.5L6 15V17H18V15.5H16Z"
                fill="#64748b"
              />
            </svg>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.source}>{article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}</p>
        <p className={styles.description}>{article.description}</p>

        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.button}>
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
