import PersonTable from './person/Person';
import Header from '@/component/Header/page';

export default function Home() {
  return (
    <div>
      <div>
        <Header title="Person" />
        <PersonTable id={0} firstname={''} lastname={''} phone={''} />
      </div>
    </div>
  );
}
