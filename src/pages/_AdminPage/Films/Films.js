import React, {Fragment, useEffect} from "react";
import { Table } from "antd";
import { Input, Space } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined, WindowsFilled, CalendarOutlined } from "@ant-design/icons";
import { Button } from "antd/lib/radio";
import {useSelector, useDispatch} from 'react-redux';
// import {layDanhSachPhimAction} from '../../../redux/actions/FilmActions';
import {layDanhSachPhimAction, xoaPhimAction} from '../../../redux/actions/QuanLyPhimAction';
import { object } from "yup";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

const { Search } = Input;

export default function Films() {
// Kết nối Reducer lấy danh sách phim

// const arrFilm = useSelector(rootReducer => rootReducer.FilmReducer.mangPhim);
const {arrFilm} = useSelector(state=>state.QuanLyPhimReducer);

//Tạo ra hàm dispatch 
const dispatch = useDispatch();

useEffect(() => {
    //Tạo ra action là function
    dispatch(layDanhSachPhimAction());
    
}, [])

console.log("Mảng phim", arrFilm);

// Kết thúc Kết nối Reducer lấy danh sách phim

    const columns = [
        {
          title: "Mã phim",
          dataIndex: "maPhim",
          width: '10%',
          sorter: (a, b) => b.maPhim - a.maPhim,
          sortDirections: ['descend','ascend'],
          // sortOrder: 'descend'
        },
        {
          title: "Hình ảnh",
          dataIndex: "hinhAnh",
          
          render: (text,films,index) => {return <Fragment>
            <img src={films.hinhAnh} alt={films.tenPhim} width={50} height={50} onError={(e) => {e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }}/>

          </Fragment>},
          width: '15%',
        },
        {
          title: "Tên phim",
          dataIndex: "tenPhim",
          
          sorter: (a, b) => {
            let tenPhimA = a.tenPhim.toLowerCase().trim();
            let tenPhimB = b.tenPhim.toLowerCase().trim();
            if(tenPhimA > tenPhimB){
              return 1;
            }
            return -1;
          },
          width: '20%',
          sortDirections: ['descend','ascend'],
        },
        {
          title: "Mô tả",
          dataIndex: "moTa",
          sorter: (a, b) => {
            let moTaA = a.moTa.toLowerCase().trim();
            let moTaB = b.moTa.toLowerCase().trim();
            if(moTaA > moTaB){
              return 1;
            }
            return -1;
          },
          render: (text,films,index) => {return <Fragment>

            {/* Chua hoạt động */}

            {films.moTa.lenght>50 ? films.moTa.subStr(0,50) + '...' : films.moTa}

          </Fragment>},
          width: '25%',
          sortDirections: ['descend','ascend'],
        },
        {
          title: "Hành động",
          dataIndex: "hanhDong",
          render: (text,films,index) => {return <Fragment>

            <NavLink key={1} className="mr-2 text-2xl" to={`/admin/films/edit/${films.maPhim}`}><EditOutlined style={{color:'blue'}}/></NavLink>;
            <span style={{cursor:'pointer'}} key={2} className="" 
            onClick={()=>{
              if(window.confirm('Bạn có chắc muốn xóa phim' + films.tenPhim)){
                // Gọi action xóa
                dispatch(xoaPhimAction(films.maPhim));

              }

            }}><DeleteOutlined style={{color:'red'}}/></span>;
            <NavLink key={3} className="mr-2 text-2xl" to={`/admin/films/showtimes/${films.maPhim}`}><CalendarOutlined style={{color:'green'}}/></NavLink>;

          </Fragment>},
          
          width: '10%',
        },
        
      ];
      
      
      const data = arrFilm;
        
      function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
      }
      
      const onSearch = value => {
        console.log(value);
        // Gọi Api layDanhSachPhim
        dispatch(layDanhSachPhimAction(value));
      } 

  return (
    <div >
      <h3 className="text-4xl">Quản lý phim</h3>
      <Button className="mb-5" onClick={()=>{
        history.push('/admin/films/addnewfilm');
      }}>Thêm phim</Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton= {<SearchOutlined/>}
        size="large"

        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
