'use client';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Linkn } from '@/components/Linkn';
import { useEffect } from 'react';
import { useState } from 'react';

type Product = {
  id: number;
  title: string;
  imageUrl: string;
  fileUrl: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
};

const Update: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  // const router = useRouter();

  const fetchProducts = async (page: number, pageSize: number) => {
    setLoading(true);
    const response = await fetch(
      `/api/resource/updateresources?page=${page}&pageSize=${pageSize}`,
    );
    const data = await response.json();
    setProducts(data.products);
    setRowCount(data.total);
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('id')) {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const handleDelete = async (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));

    try {
      const response = await fetch(`/api/resource/deleteresource?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  // const handleUpdate = (id: number) => {
  //   router.push(`/resource/update/${id}`);
  // };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      renderCell: (params) => (
        <Linkn href={`/resource/single/${params.row.id}`}>
          <h1 className="underline text-blue-500">{params.value}</h1>
        </Linkn>
      ),
    },
    {
      field: 'imageUrl',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <Image
          src={params.value}
          alt={params.row.title}
          width={50}
          height={50}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'fileUrl',
      headerName: 'File',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: '#8b5cf6' }}
          href={params.value}
          target="_blank"
        >
          Download
        </Button>
      ),
    },
    { field: 'addedBy', headerName: 'Added By', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    { field: 'updatedAt', headerName: 'Updated At', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Linkn href={`/resource/update/${params.row.id}`}>
            <IconButton
              color="secondary"
              // onClick={() => handleUpdate(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </Linkn>
          <IconButton
            sx={{ color: '#ef4444' }}
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen p-2">
        <h1 className="text-3xl">You are not authorized to view this page</h1>
      </div>
    );
  }

  return (
    <div className="w-full m-auto p-5" style={{ height: 600 }}>
      <DataGrid
        rows={products}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

export default Update;
