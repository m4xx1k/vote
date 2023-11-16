import Header from "../../../shared/ui/layout/Header";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className="wrapper" style={{background:'#fff'}}>
                {children}
            </div>
        </>
    );
};

export default Layout;
