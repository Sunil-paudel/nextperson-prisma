import PersonTable from './person/Person';
import styles from './page.module.css';
import Header from '@/component/Header/page';

export default function Home() {
  return (
    <div className={styles.center}>
      <div>
        <Header title="Person" />
        <PersonTable id={0} firstname={''} lastname={''} phone={''} />
      </div>
    </div>
  );
}
