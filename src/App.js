import './App.css';
import Formatter from "./formatter";
import Add from "./dialogs/add";
import {createRef, useEffect, useState} from "react";
import _ from "lodash";
import * as htmlToImage from 'html-to-image';
import {Anchor} from "react-feather";

function App(props) {
  const [data, setData] = useState([])
  const [myArray, setMyArray] = useState([])
  useEffect(() => {
    let array = []
    let grp = _.groupBy(data, 'date')
    let keys = Object.keys(grp);
    keys.forEach(date => {
      array.push({date, content: grp[date]})
    })
    setMyArray(array)
  }, [data])
  return (
    <>
      <Add setData={setData} data={data}/>
      <div {...props} id='diary'>
        {myArray?.map((elt, i) => (
          <>
            <HeaderDiary date={elt?.date} index={i}/>
            {elt.content.map(c => (
              <div className='insertion'>
                <div className='debit'>
                  <div>{c.isDebit ? c.account : ''}</div>
                </div>
                <div className='credit flex-col'>
                  <div className='transaction-content'>
                    <div>{!c.isDebit ? c.account : ''}</div>
                  </div>
                </div>
                <div className='flex-col description'>
                  <div className='transaction-content' style={{marginLeft: c.isDebit ? 0 : 100}}>{c.text}</div>
                </div>
                <div className='amount-debit flex-col'>
                  <div>{c.isDebit ? Formatter.currency(c.amount) : ''}</div>
                </div>
                <div className='amount-credit flex-col'>
                  <div>{!c.isDebit ? Formatter.currency(c.amount) : ''}</div>
                </div>
              </div>
            ))}
            <FooterDiary/>
          </>
        ))}
      </div>
      <button onClick={()=>{
        var node = document.getElementById('diary');
        htmlToImage.toPng(node)
          .then(function (dataUrl) {
            let img = document.createElement('a');
            img.href = dataUrl;
            document.body.appendChild(img);
            img.click()
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      }}>
        ok
      </button>
    </>
  );
}

const HeaderDiary = ({date, index}) => (
  <div className='insertion'>
    <div className='debit'>
      <div className='date'>&nbsp;</div>
    </div>
    <div className='credit flex-col'>
      <div className='date'>&nbsp;</div>
    </div>
    <div className={`flex-col description ${index === 0 ? 'border-top' : ' '}`}
         style={{
           borderTopLeftRadius: index === 0 ? 6 : 0,
           borderTopRightRadius: index === 0 ? 6 : 0,
           borderBottom: 'none'
         }}>
      <div className='date'>{date?.split('-')[2]}/{date?.split('-')[1]}</div>
    </div>
    <div className='amount-debit flex-col'>
      <div className='date'>&nbsp;</div>
    </div>
    <div className='amount-credit flex-col'>
      <div className='date'>&nbsp;</div>
    </div>
  </div>
)
const FooterDiary = () => (
  <div className='insertion'>
    <div className='debit'>
      <div className='transaction-title'>&nbsp;</div>
    </div>
    <div className='credit flex-col'>
      <div className='transaction-title'>&nbsp;</div>
    </div>
    <div className='flex-col description border-bottom'>
      <div className='transaction-title'>Transaction text</div>
    </div>
    <div className='amount-debit flex-col'>
      <div className='transaction-title'>&nbsp;</div>
    </div>
    <div className='amount-credit flex-col'>
      <div className='transaction-title'>&nbsp;</div>
    </div>
  </div>
)

export default App;
