type Props ={
    url?:string
}
export default function HomePage(){
    // const BASE_URL = process.env.FRONDEND_URL;
    return (
    <div>
        <p>hello world  aaaa</p>
        <p>hello world  aaaa</p>
        <p>ahi {process.env.REACT_APP_FRONDEND_URL}</p>
        <p>ahi {process.env.REACT_APP_AHI}</p>
    </div>
    )
}