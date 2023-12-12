import PersonTable from './person/Person';
import Header from '@/component/Header/page';

export default function Home() {
  return (
    <div>
      <Header title="People list" />
      <div className="mt-8">
        <PersonTable  />
      </div>
    </div>
  );
}
