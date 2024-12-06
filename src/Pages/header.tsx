const Header: React.FC = () => {
  function MainPage() {
    window.location.href = '/'
  }
  function AddPage() {
    window.location.href = '/addProducts'
  }
  return (
    <div className="Header text-center">
      <button className="btn btn-dark border m-2" onClick={MainPage}>
        Products
      </button>
      <button className="btn btn-dark border m-2" onClick={AddPage}>
        Add Products
      </button>
      <button className="btn btn-dark border m-2">
        Favorites
      </button>
    </div>
  )
}
export default Header