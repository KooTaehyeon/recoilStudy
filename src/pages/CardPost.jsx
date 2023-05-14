import React, { useRef, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { ProductIdSelector, ProductAtom } from '../recoil/AllProduct';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
const CartPost = () => {
  const titleInputRef = useRef(null);
  const PriceInputRef = useRef(null);
  const navigate = useNavigate();
  // const contentInputRef = useRef(null);
  const [addProduct, setAddProduct] = useRecoilState(ProductAtom);
  const id = useRecoilValue(ProductIdSelector); // id값
  const [htmlContent, setHtmlContent] = useState(''); //🌈
  console.log(htmlContent, 'htmlContent');
  const quillRef = useRef(); //🌈
  function submitHandler(e) {
    e.preventDefault();

    const description = quillRef.current.getEditor().getText(); //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
    // const htmlDescription = quillRef.current.getEditor().getHTML();
    if (description.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    console.log(description);
    // console.log(description, 'htmlDescription');
    const enteredTitle = titleInputRef.current.value;
    const enteredPriceInput = PriceInputRef.current.value;
    // const enteredContent = contentInputRef.current.value;

    const Data = {
      id: id + 1,
      price: Number(enteredPriceInput),
      title: enteredTitle,
      description: htmlContent,
    };

    setAddProduct((prev) => [...prev, Data]);
    navigate('/');
  }
  console.log(addProduct);

  //
  const imageHandler = useCallback(() => {
    // const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기

    const input = document.createElement('input'); // input 태그를 동적으로 생성하기
    // input.setAttribute('type', 'file');
    // input.setAttribute('accept', 'image/*'); // 이미지 파일만 선택가능하도록 제한
    // input.setAttribute('name', 'image');
    input.click();
    console.log('tlfgod');
    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = async (content, delta, source, editor) => {
      console.log(content, 'e1', delta, 'e2', source, 'e3', editor, 'eee');
      //   const file = input.files[0];
      //   formData.append('image', file); // 위에서 만든 폼데이터에 이미지 추가

      // 폼데이터를 서버에 넘겨 multer로 이미지 URL 받아오기
      // const res = await api.uploadImage(formData);
      // if (!res.success) {
      //   alert('이미지 업로드에 실패하였습니다.');
      // }
      // const url = res.payload.url;
      const quill = quillRef.current.getEditor();
      /* ReactQuill 노드에 대한 Ref가 있어야 메서드들을 호출할 수 있으므로
          useRef()로 ReactQuill에 ref를 걸어주자.
          getEditor() : 편집기를 지원하는 Quill 인스턴스를 반환함
          여기서 만든 인스턴스로 getText()와 같은 메서드를 사용할 수 있다.*/

      const range = quill.getSelection()?.index;
      //getSelection()은 현재 선택된 범위를 리턴한다. 에디터가 포커싱되지 않았다면 null을 반환한다.

      if (typeof range !== 'number') return;
      /*range는 0이 될 수도 있으므로 null만 생각하고 !range로 체크하면 잘못 작동할 수 있다.
          따라서 타입이 숫자이지 않을 경우를 체크해 리턴해주었다.*/

      quill.setSelection(range, 1);
      /* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다. 
             위치 인덱스와 길이를 넣어주면 된다.*/

      // quill.clipboard.dangerouslyPasteHTML(
      //   range,
      //   `<img src=${url} alt="image" />`
      // );
    }; //주어진 인덱스에 HTML로 작성된 내용물을 에디터에 삽입한다.
  }, [quillRef]);

  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            // { size: [] },
            { color: ['red', 'blue', 'brown'] },
          ],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          // ['image', 'video'],
          // ['clean'],
        ],
        handlers: {
          // 위에서 만든 이미지 핸들러 사용하도록 설정
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );
  const formats = [
    'header',
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'formula',
    'list',
    'bullet',
    'indent',
    'link',
    // 'image',
    // 'video',
    'align',
    'color',
    'background',
  ];
  return (
    <Form onSubmit={submitHandler}>
      <InputBox>
        <label htmlFor='title'>title</label>
        <br />
        <input type='text' ref={titleInputRef} id={'title'} />
      </InputBox>
      <InputBox>
        <label htmlFor='Price'>Price</label>
        <br />
        <input type='text' ref={PriceInputRef} id={'price'} />
      </InputBox>
      {/* <InputBox>
        <label htmlFor='title'>content</label>
        <br />
        <textarea type='text' ref={contentInputRef} id={'content'} />
      </InputBox> */}
      <label htmlFor='description'>description</label>
      <QuillBox>
        <ReactQuill
          ref={quillRef}
          value={htmlContent}
          onChange={setHtmlContent}
          modules={modules}
          formats={formats}
          theme='snow'
          className='quill'
        />
      </QuillBox>
      <FormBtn>추가해주기</FormBtn>
    </Form>
  );
};

export default CartPost;
const QuillBox = styled.div`
  .quill {
    margin: 5px auto;
    height: 200px;
    width: 90%;
  }
  /* svg {
    width: 10px;
  } */
`;

const Form = styled.form`
  width: 80%;
  height: 430px;
  margin: 10px auto;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  text-align: center;
`;
const InputBox = styled.div`
  width: 90%;
  margin: 5px auto;
  label {
    font-weight: 700;
  }
  input {
    width: 100%;
    border: 1px #dcdcdc solid;
    margin: 5px 0;
  }
  textarea {
    width: 50%;
    border: 1px #dcdcdc solid;
    margin: 5px 0;
    resize: none;
    height: 100px;
  }
`;
const FormBtn = styled.button`
  padding: 8px;
  width: 40%;
  position: relative;
  bottom: -35px;
  color: #fff;
  background-color: var(--main);
  margin: 5px auto;
`;
