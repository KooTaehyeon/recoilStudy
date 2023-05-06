import React, { useMemo, useCallback, memo } from 'react';
import styles from './quillEditor.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // react-quill과 css파일 import 하기

const QuillEditor = memo(({ quillRef, htmlContent, setHtmlContent }) => {
  // 툴바의 사진 아이콘 클릭시 기존에 작동하던 방식 대신에 실행시킬 핸들러를 만들어주자.
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
      console.log(range, 'range');
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
          [{ font: [] }], // font 설정
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'code-block',
            'formula',
          ], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ], // 리스트, 인덴트 설정
          ['link', 'image', 'video'], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
          ['clean'], // toolbar 설정 초기화 설정

          // ['image', 'video'],
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
    'image',
    'video',
    'align',
    'color',
    'background',
  ];
  return (
    <>
      <ReactQuill
        ref={quillRef}
        value={htmlContent}
        onChange={setHtmlContent}
        modules={modules}
        formats={formats}
        theme='snow'
        className={styles.quillEditor}
      />
    </>
  );
});

export default QuillEditor;
