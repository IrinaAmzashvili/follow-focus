import { useState } from 'react';
import styles from './Comments.module.css';


const Comments = () => {
  const [comment, setComment] = useState();

  return (
    <div className={styles.commentsSectionDiv}>
      <div className={styles.commentTextareaDiv}>
        <label htmlFor='commentInput'>
          <textarea
            id='commentInput'
            name='commentInput'
            placeholder='Do you have any questions or comments?...'
            className={styles.commentTextarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.commentsSection}>
        <div></div>
      </div>
    </div>
  )
}

export default Comments;
