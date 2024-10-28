/**
 * Renders a form for creating or updating a category.
 *
 * @return {JSX.Element} The rendered form component.
 */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CustomInput } from '../components/';
import { useNavigate, useParams } from 'react-router-dom';
import { usePermission } from '../context/PermissionContext';
import { useCategories } from '../context/CategoriesContext';
import { uploadMediaCategory } from '../api/categories';

const CategoriesFormPages = () => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const { permissionsData } = usePermission();
  const {
    saveCategory,
    errors: errorsCategories,
    updateCategory,
    getCategory,
  } = useCategories();
  const navigate = useNavigate();
  const params = useParams();
  const [fileState, setFileState] = useState(Object);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        const response = await updateCategory(params.id, {
          _id: data._id,
          name: data.name,
          cover: data.cover,
          permissions: data.permissions,
        });
        console.log(response)
        await uploadPhotoAfterCreate(response)
      } else {
        console.log('hola')
        const response = await saveCategory({
          _id: data._id,
          name: data.name,
          cover: data.cover,
          permissions: data.permissions,
        });
        console.log('hola2')
        await uploadPhotoAfterCreate(response)
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    const loadCategory = async () => {
      if (params.id) {
        const category: any = await getCategory(params.id);
        setValue('name', category.name);
        setValue('cover', category.cover);
        setValue('permissions', category.permissions);
      }
    };
    loadCategory();
  }, []);

  useEffect(() => {
    if (!params.id) {
      reset();
    }
  }, [params.id]);

  const changePhoto = (event: any) => {
    setFileState(event.target.files[0])
    setValue('cover',event.target.files[0])
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setPreviewUrl(event.target.result.toString());
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  const uploadPhotoAfterCreate = async (response: any) => {
    const media =  response.data;
    if (fileState && media?._id) {
      const formData = new FormData();
      formData.append('file', fileState);
      formData.append('name', fileState?.name);
      formData.append('id', String(media._id));
      try {
        await uploadMediaCategory(formData);
        navigate('/categories');
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Card>
      {errorsCategories &&
        errorsCategories.length > 0 &&
        errorsCategories.map((error, i) => (
          <p
            key={i}
            className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1"
          >
            {error}
          </p>
        ))}
      <h1 className="text-white text-3xl mb-5">
        {params.id ? 'Update' : 'Create'} Category
      </h1>
      <form onSubmit={onSubmit}>
        <CustomInput
          type="text"
          label="Name"
          name="name"
          register={register}
          registerOptions={{ required: true }}
        />
        {errors.name && (
          <p className="text-red-500">name category is required</p>
        )}
        {/* <CustomInput
          type="text"
          label="Cover image url"
          name="cover"
          register={register}
          registerOptions={{ required: true }}
        />
        {errors.cover && (
          <p className="text-red-500">cover image url is required</p>
        )} */}

            <div className="self-stretch">
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">



                  {
                    (!!fileState?.size && !params.id) ? 
                    //CREAR, CUANDO YA SELECCIONÉ UNA FOTO
                    <img src={previewUrl} alt="" className="mx-auto h-40 w-40 text-gray-400" /> :
                    //CREAR, CUANDO ESTA EN ESTADO INCIAL PARA CREAR
                    <svg
                        className={`mx-auto h-12 w-12 text-gray-400`}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                    </svg> 
                  }

                  {
                    (!fileState?.size && !!params.id) ?
                    //EDITAR, CUANDO ESTA EN ESTADO INCIAL PARA EDITAR
                    <img src={`http://localhost:3000/uploads/${getValues('cover')}`} alt="" className="mx-auto h-40 w-40 text-gray-400" /> :
                    //EDITAR, CUANDO YA SELECCIONÉ UNA FOTO
                    <img src={previewUrl} alt="" className={`mx-auto h-40 w-40 text-gray-400 ${ !params.id && 'hidden' }`} />
                  }


                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Sube un archivo</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".jpg,.png,.gif,.jpef" onChange={changePhoto} />
                    </label>
                    <p className="pl-1">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF menor a 10MB</p>
                </div>
              </div>
            </div>
            { errors.file && <div className="HintText self-stretch text-red-400 text-sm font-normal leading-tight">Este campo es obligatorio</div> }



        <div className="w-full mb-4">
          <span className="text-white">Permissions</span>
          <div className="flex gap-2">
            {permissionsData.map((permission: any, i: number) => {
              return (
                <div key={i}>
                  <input
                    type="checkbox"
                    value={permission?.name}
                    className="mr-2"
                    {...register('permissions', { required: true })}
                  />
                  {permission?.name}
                </div>
              );
            })}
          </div>
          {errors.permissions && (
            <p className="text-red-500">permissions is required</p>
          )}
        </div>
        <Button>Save</Button>
      </form>
    </Card>
  );
};

export default CategoriesFormPages;

