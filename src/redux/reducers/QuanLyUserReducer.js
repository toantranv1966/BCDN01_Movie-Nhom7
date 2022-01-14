export const GET_ALL_USER = 'GET_ALL_USER';

const stateDefault = {
    arrUsers: [
        {
            "taiKhoan": "0941234234",
            "hoTen": "tttttt",
            "email": "asdfqwe@gmail.com",
            "soDt": "0388888888",
            "matKhau": "09412342344",
            "maLoaiNguoiDung": "QuanTri"
          },
          {
            "taiKhoan": "123@admin",
            "hoTen": "123@admin",
            "email": "123admin@gmail.com",
            "soDt": "0388888888",
            "matKhau": "123456",
            "maLoaiNguoiDung": "QuanTri"
          },
          {
            "taiKhoan": "123@admin10",
            "hoTen": "thai minh long",
            "email": "asdsssssss@gmail.com",
            "soDt": "099333322",
            "matKhau": "123456w",
            "maLoaiNguoiDung": "QuanTri"
          },
    ]
}

export const QuanLyUserReducer = (state=stateDefault,action) => {
    switch(action.type) {

        case GET_ALL_USER :{
            state.arrUsers = action.arrUsers;
            return {...state};
        }

        default: return {...state}
    }

}