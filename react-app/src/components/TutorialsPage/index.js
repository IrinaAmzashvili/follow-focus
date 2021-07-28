import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTutorials } from '../../store/tutorials';
// import styles from './TutorialsPage.module.css';


const TutorialsPage = () => {
  const dispatch = useDispatch();
  const allTutorials = useSelector(state => state)
  console.log(allTutorials)

  useEffect(() => {
    dispatch(getTutorials())
  }, [dispatch])

  return (
    <div>
      <div>
        Hi! from tutorials
      </div>
    </div>
  )
}

export default TutorialsPage;
