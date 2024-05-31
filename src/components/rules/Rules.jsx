import styles from "./Rules.module.css";

function Rules({setIsRulesVisible}) {
  return (
    <div className={styles.rulesWrapper}>
      <div className={styles.rulesContainer}>
        <div className={styles.rulesSubContainer1}>
          <div className={styles.closeBtn} onClick={()=>setIsRulesVisible(false)}>❌</div>
          <h1 className={styles.rulesHeading}>Rules</h1>
          <p className={styles.rules}>
            1.Click on the blue diamond that appears on the snake board to gain
            +10 points
          </p>
          <p className={styles.rules}>
            2.As soon as the snake eats the blue diamond 10 points will be
            deducted from your score
          </p>
          <p className={styles.noteSection}>
            <span >NOTE:</span>Snake head should
            touch the blue diamond not the snake body
          </p>
        </div>
        <div className={styles.rulesSubContainer2}>
          <div className={styles.disclaimer}>
            <h1 className={styles.rulesHeading}>Disclaimer</h1>
            <p>1.This is not your typical snake game </p>
            <p>2.You need high focus to play this game</p>
            <p>3.The speed of the snakes keep increasing until you lose</p>
            <p className={styles.noteSection}>
              NOTE:Please don't play this game when you are stressed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
