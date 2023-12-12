import PersonTable from './person/Person';
import Header from '@/component/Header/Header';

export default function Home() {
  return (
    <div>
      <Header title="People list" />
      <div className="mt-8">
        <PersonTable id={0} firstname={''} lastname={''} phone={''} />
      </div>
    </div>
  );
}
