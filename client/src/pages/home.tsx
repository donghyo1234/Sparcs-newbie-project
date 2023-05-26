import React from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/home.css";
import "./css/post.css";
import { SAPIBase } from "../tools/api";


interface IAPIResponse  { _id: string, title: string, content: string, author: String, itemViewCnt: number }

const HomePage = (props: {}) => {
  const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
  const [ NPostCount, setNPostCount ] = React.useState<number>(10);
  const [ SNewPostTitle, setSNewPostTitle ] = React.useState<string>("");
  const [ SNewPostContent, setSNewPostContent ] = React.useState<string>("");
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("");

  const [ Username, setUsername ] = React.useState<string>("");
  const [ Password, setPassword ] = React.useState<string>("");
  const [ Logged, setLogged ] = React.useState<boolean>(false);



  const navigate = useNavigate();
  const [ BServerConnected, setBServerConnected ] = React.useState<boolean>(false);

  useInterval(()=>{
    // Note that this may not be the best practice.
    // Race condition may occur if component is unmounted after API call and before state update
    interface IStatusAPIRes { isOnline: boolean };
    const asyncFun = async () => {
      const res = await axios.get<IStatusAPIRes>(SAPIBase + "/status");
      setBServerConnected(res.data.isOnline);
    }
    asyncFun().catch((e) => setBServerConnected(false));
  }, 5000);

  const getAccountInformation = () => {
    const asyncFun = async() => {
      interface IAPIResponse { msg: string };
      const { data } = await axios.post<IAPIResponse>(SAPIBase + '/account/getInfo', { username: Username, password: Password });
      window.alert(data.msg);
      setLogged(true);
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED: ${e}`));
  }

  const registerAccount = () => {
    if (Username === "" || Password === "") {
      alert("Username or password cannot be empty.");
      return;
    }

    const asyncFun = async() => {
      interface IAPIResponse { msg: string };
      const { data } = await axios.post<IAPIResponse>(SAPIBase + '/account/register', { username: Username, password: Password, register: true });
      window.alert(data.msg);
      setLogged(true);
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED: ${e}`));
  }

  
  React.useEffect( () => {
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `/post/getPost?count=${ NPostCount }&search=${ SSearchItem }`);
      console.log(data);
      if (BComponentExited) return;
      setLAPIResponse(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }
  }, [ NPostCount, SSearchItem ]);

  const createNewPost = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/post/addPost', { title: SNewPostTitle, content: SNewPostContent,author : Username } );
      setNPostCount(NPostCount +1);
      setSNewPostTitle("");
      setSNewPostContent("");
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const deletePost = (val : IAPIResponse) => {
    const asyncFun = async () => {
      const id = val._id;
      if (Username === val.author){
        await axios.post( SAPIBase + '/post/deletePost', { id: id } );
        setNPostCount(NPostCount -1 );
      }
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }
  const logOut = () => {
    setLogged(false);
  }



  return (
    <div className={"home"}>
      <div className={"home-banner"}>
        <div className={"sparcs-logo-wrapper"}>
          <span className={"sparcs-logo"}>운 운 운</span>  운동을 합시다!
        </div>
        <div className={"Authenticationclass"} >
          <div className={"account-token-input"}>
            { Logged ? <div>
         <div className={"page-subtitle-ed"}> '{Username}' 사용자로 로그인했습니다</div> <button onClick={e => logOut()}>로그아웃</button></div> : <div><div className={"page-subtitle-ee"}>로그인 / 회원가입</div><div> </div><input type={"text"} placeholder={"아이디"}value={Username} onChange={e => setUsername(e.target.value)}/><br/>
             <input type={"password"} placeholder={"비밀번호"} value={Password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={e => registerAccount()}>회원가입</button><button onClick={e => getAccountInformation()}>로그인</button></div>}
          </div>
          </div>
      </div>
      
      <div className={"link-wrapper"}>
        <div className={"link-options"}>
          { Logged ? 
          
          
          <div className="page-link">
            <div className={"page-subtitle"}>오운완</div>
          <h2>오늘의 운동을 공유하세요!</h2>
          <div className={"post-length-input"}>
           
           
          </div>
          <div className={"post-list"}>
            { LAPIResponse.map( (val, i) =>
              <div key={i} className={"post-item"}>
                { (Username === val.author) ?
                <div className={"delete-item"} onClick={(e) => deletePost(val)}>삭제</div> : <div></div>}
                <h3 className={"post-title"}>{ val.title }</h3>
                <p className={"post-body"}>{ val.content }</p>
                <p className={"post-bddd"}>작성자 : { val.author }</p>
              </div>
            ) }
            <div className={"post-item-add"}>
              제목: <input className={"post-title-input"} type={"text"} value={SNewPostTitle} onChange={(e) => setSNewPostTitle(e.target.value)}/>
              <div ></div>
              내용: <input type={"textbox"} className={"post-content-input"} value={SNewPostContent} onChange={(e) => setSNewPostContent(e.target.value)}/>
              <div className={"post-add-button"} onClick={(e) => createNewPost()}>공유하기</div>
              
            </div>
            
          </div>
          <div className={"post-length-input"}>
            검색 : <input type={"search"} value={ SSearchItem } id={"post-search-input"}
                   onChange={ (e) => setSSearchItem( e.target.value ) }
            /><br></br>
            보여지는 갯수 : <input type={"number"} value={ NPostCount } id={"post-count-input"} min={0}
                   onChange={ (e) => setNPostCount( parseInt(e.target.value) ) }  />
          </div>
        </div>
          
          
          
          : <div className={"page-link"} >
            <div className={"page-subtitle"}>오운완</div>
            <div className={"page-title"}> 오늘의 운동을 공유하려면 먼저 로그인하세요</div>
          </div>}
          

        </div>
      </div>

    </div>
  )
};

export default HomePage;