import React, { useRef, useState, memo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { ProductIdSelector, ProductAtom } from '../recoil/AllProduct';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CartPost = () => {
  const titleInputRef = useRef(null);
  const PriceInputRef = useRef(null);
  // const contentInputRef = useRef(null);
  const [addProduct, setAddProduct] = useRecoilState(ProductAtom);
  const id = useRecoilValue(ProductIdSelector); // id값
  const [htmlContent, setHtmlContent] = useState(''); //🌈

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
  }
  console.log(addProduct);
  return (
    <Form onSubmit={submitHandler}>
      <InputBox>
        <label htmlFor='title'>title</label>
        <br />
        <input type='text' ref={titleInputRef} id={'title'} />
      </InputBox>
      <InputBox>
        <label htmlFor='title'>Price</label>
        <br />
        <input type='text' ref={PriceInputRef} id={'price'} />
      </InputBox>
      {/* <InputBox>
        <label htmlFor='title'>content</label>
        <br />
        <textarea type='text' ref={contentInputRef} id={'content'} />
      </InputBox> */}

      <ReactQuill
        ref={quillRef}
        value={htmlContent}
        onChange={setHtmlContent}
        theme='snow'
        style={{
          width: '90%',
          margin: '5px auto',
          height: '200px',
        }}
      />
      <FormBtn>추가해주기</FormBtn>
    </Form>
  );
};

export default CartPost;

const Form = styled.form`
  width: 80%;
  height: 420px;
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
  bottom: -45px;
  color: #fff;
  background-color: var(--main);
  margin: 5px auto;
`;
