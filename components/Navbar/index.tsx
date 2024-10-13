import Options from './components/Options';
import Title from './components/Title';

export default function Navbar() {
  return (
    <nav className=" mb-10 bg-white sticky top-0 z-10">
      <div className="flex justify-between items-center py-2 ml-5 mr-5 h-20">
        <div>
          <Title />
        </div>
        <Options />
      </div>
    </nav>
  );
}
