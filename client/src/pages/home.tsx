import React from "react";
import axios from "axios";
import { useNavigate }  from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/home.css";
import "./css/post.css";
import { SAPIBase } from "../tools/api";


interface IAPIResponse  { _id: string, title: string, content: string, author: String, itemViewCnt: number};
interface IAPIRanking  {author: String, postCount: number, itemViewCnt: number}

const HomePage = (props: {}) => {
  const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
  const [ LAPIRanking, setLAPIRanking ] = React.useState<IAPIRanking[]>([]);
  const [ NPostCount, setNPostCount ] = React.useState<number>(10);
  const [ NRankCount, setNRankCount ] = React.useState<number>(10);
  const [ SNewPostTitle, setSNewPostTitle ] = React.useState<string>("");
  const [ SNewPostContent, setSNewPostContent ] = React.useState<string>("");
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("");
  const [ Username, setUsername ] = React.useState<string>("");
  const [ Password, setPassword ] = React.useState<string>("");
  const [ Logged, setLogged ] = React.useState<boolean>(false);


  useInterval(()=>{
    interface IStatusAPIRes { isOnline: boolean };
    const asyncFun = async () => {
      const res = await axios.get<IStatusAPIRes>(SAPIBase + "/status");
    }
    asyncFun().catch((e) => window.alert(e));
  }, 5000);

  const getAccountInformation = () => {
    const asyncFun = async() => {
      interface IAPIResponse { success: boolean, msg: string };
      const { data } = await axios.post<IAPIResponse>(SAPIBase + '/account/getInfo', { username: Username, password: Password });
      if (data.success){
        window.alert(data.msg);
        setLogged(true);
      } else {
        window.alert(data.msg);
      }
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED: ${e}`));
  }

  const registerAccount = () => {
    if (Username === "" || Password === "") {
      alert("아이디와 비밀번호는 공백일 수 없습니다.");
      return;
    }
    if (Username.length < 4 || Username.length >12 || Password.length < 4 || Password.length >12) {
      alert("아이디와 비밀번호는 4~12 글자여야 합니다");
      return;
    }

    const asyncFun = async() => {
      interface IAPIResponse { success: boolean, msg: string };
      const { data } = await axios.post<IAPIResponse>(SAPIBase + '/account/register', { username: Username, password: Password, register: true });
      
      if (data.success){
        window.alert(data.msg);
        setLogged(true);
      } else {
        window.alert(data.msg);
      }
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED: ${e}`));
  }

  
  React.useEffect(() => {
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get( SAPIBase + `/post/getRanking?count=${ NRankCount }`);
      if (BComponentExited) return;
      setLAPIRanking(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }
  }, [NRankCount]); 
  
  React.useEffect( () => {
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `/post/getPost?count=${ NPostCount }&search=${ SSearchItem }`);
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
      setNRankCount(NRankCount +1);
      
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
         <div className={"page-subtitle-ed"}> '{Username}' 사용자로 로그인했습니다</div> <button onClick={e => logOut()}>로그아웃</button></div> : <div><div className={"page-subtitle-ee"}>로그인 / 회원가입</div><div> </div><input type={"text"} placeholder={"아이디"} value={Username} onChange={e => setUsername(e.target.value)}/><br/>
             <input type={"password"} placeholder={"비밀번호"} value={Password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={e => registerAccount()}>회원가입</button><button onClick={e => getAccountInformation()}>로그인</button></div>}
          </div>
          </div>
      </div>
      
      <div className={"link-wrapper"}>
        <div className={"link-options"}>
          { Logged ? 
          
          <div>
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
          
        </div>
          
          
          : <div><div className={"page-link"} >
            <div className={"page-subtitle"}>오운완</div>
            <div className={"page-title"}> 오늘의 운동을 공유하려면 먼저 로그인하세요</div>
          </div>
          </div>}
          {Logged ? <div className={"page-link"} >
          { LAPIRanking.map( (val, i) =>
              <div key={i} className={"post-item"}>
                <h4 className={"rank-title"}>{ i + 1} 등</h4>
                <h3 className={"rank-body"}>{ val.author  } 님</h3>
                <p className={"post-bddd"}>{val.postCount } 개 작성함</p>
              </div>

            ) }보여지는 순위 : <input type={"number"} value={ NRankCount } min={1}
            onChange={ (e) => setNRankCount( parseInt(e.target.value) ) }  />
          </div>:<div className={"page-link"} >
            <div className={"page-subtitle"}>순위표</div>
            <div className={"page-title"}> 순위표를 확인하려면 먼저 로그인하세요</div>
          </div>}
        </div>
      </div>

    </div>
  )
};

export default HomePage;