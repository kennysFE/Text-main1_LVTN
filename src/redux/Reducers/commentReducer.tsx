import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../utils/setting';
import { AppDispatch } from '../configStore';

export interface Comment{
    id: number,
    maPhong: number,
    maNguoiBinhLuan: number,
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: number
}

interface CommentState{
    commentById:Comment|any;
    commentList: Comment[]
}

const initialState : CommentState= {
    commentById:[],
    commentList:[]
}

const commentReducer = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    CommentRoomId:(state,action:PayloadAction<Comment>)=>{
           state.commentById = action.payload;
    },
    getAllComments:(state: CommentState, action: PayloadAction<Comment[]>) => {
      state.commentList = action.payload;
    },
  }
});

export const {CommentRoomId, getAllComments} = commentReducer.actions

export default commentReducer.reducer


//--------call api --------------------

export const getCommentRoomById=(id:number) =>{
    return async (dispatch:AppDispatch)=>{
          try{
            let result= await http.get(`/binh-luan`) ;
            let arrComment=result.data.content;
            // console.log(arrComment)
            let arrCommentId=arrComment.reduce((arr:{}[],item:{maPhong:number})=>{
                if(item.maPhong===id){
                   arr.push(item);
                }
                return arr;
            },[])
            const action = CommentRoomId(arrCommentId);
            dispatch(action);
          }
          catch(err){
            console.log(err);
          }
    }
}


// Api get all Comment

export const getCommentApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/binh-luan");
      let commentList: Comment[] = result.data.content;
      const action = getAllComments(commentList);
      console.log(result);
      dispatch(action);
      console.log(action);
    } catch (err) {
      console.log(err);
    }
  };
};

// Api delete Comment

export const deleteCommentApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/binh-luan/${id}`);
      console.log("Binhluandelete",result);
    } catch (err: any) {
      console.log(err);
    }
  };
};