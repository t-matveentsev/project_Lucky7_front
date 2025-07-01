import css from './RecipeCard.module.css';

const RecipeCard = ({ data: { thumb, time, title, description } }) => {
  const handleLearnMore = () => {
    console.log(`Learn more about: ${title}`);
  };

  const handleSave = () => {
    console.log(`Saved recipe: ${title}`);
  };

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} className={css.thumb} />
      <h3 className={css.title}>{title}</h3>
      <p className={css.time}>⏱ {time} minutes</p>
      <p className={css.description}>{description}</p>
      <div className={css.actions}>
        <div className={css.btnsWrapper}>
          <button className={css.learnMore} onClick={handleLearnMore}>
            Learn More
          </button>
          <button className={css.save} onClick={handleSave}>
            {/* <SaveIcon /> */}S
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
