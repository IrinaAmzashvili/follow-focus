import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTutorials } from '../../store/tutorials';
// import styles from './TutorialsPage.module.css';


const TutorialsPage = () => {
  const dispatch = useDispatch();
  const allTutorials = useSelector(state => Object.values(state.tutorials))
  console.log(allTutorials)

  useEffect(() => {
    dispatch(getTutorials())
  }, [dispatch])

  return (
    <div>
      <div>
        {allTutorials && allTutorials.map((tutorial) => (
          <div key={tutorial.id}>
            <div>{tutorial.title}</div>
            <div>{tutorial.description}</div>
            <div>{tutorial.videoLink}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TutorialsPage;
