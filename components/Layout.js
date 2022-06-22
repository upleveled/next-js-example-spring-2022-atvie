import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header user={props.user} refreshUserProfile={props.refreshUserProfile} />
      {
        // Page content
        props.children
      }
      <Footer />
    </div>
  );
}
