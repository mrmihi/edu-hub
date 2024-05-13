import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdPhotoCamera } from 'react-icons/md';
import { Layout } from '../../components/layout';
import { Button, Dropdown, Input } from '../../components/common';
import { createCourse, getSingleCourse, updateCourse } from '../../services';
import { setFormData } from '../../store/ui/courses';
import { useEffectOnce } from '../../hooks';
import toast from '../../libs/toastify';
import base64EncodeImage from '../../utils/image';

const CourseForm = () => {
  const { course_id: courseId } = useParams();

  const { formData, allowedTypes, allowedDays } = useSelector((state) => state.ui.courses);

  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const input = useRef(null);

  const handleInputChange = ({ target: { id, value } }) => {
    dispatch(
      setFormData({
        ...formData,
        [id]: value?.trim(),
      }),
    );
  };

  useEffectOnce(() => {
    if (courseId) {
      getSingleCourse(courseId).then(({ data }) => {
        dispatch(setFormData({ ...data, exp_date: data.exp_date.substring(0, 10), manufactured_date: data.manufactured_date.substring(0, 10) }));
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await (courseId ? updateCourse(courseId, formData) : createCourse(formData));
    if (data) {
      navigateTo('/');
      setTimeout(() => {
        dispatch(setFormData({}));
        toast.success(data.message);
      }, 300);
    }
  };

  return (
    <div>
      <Layout title="Courses" >
        <div>
          <h2 class="text-4xl font-bold leading-tight lg:text-5xl px-6 md:px-24 mt-6">{courseId ? 'Edit' : 'Add'} Course</h2>
          <form onSubmit={handleSubmit}>
            <div class="bg-indigo-50 rounded-xl shadow border-2 p-6 md:p-12 mx-6 md:mx-24 my-6">
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="name" placeholder="Course Name" label wrapperclasses="w-full" onChange={handleInputChange}
                         required value={formData.name} />
                  <Dropdown id="type" filterkey="type" label="Type" options={allowedTypes} className="h-14"
                            wrapperclasses="my-2 sm:my-0" onChange={handleInputChange} />
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input
                    id="capacity"
                    type="number"
                    label
                    placeholder="Capacity of the course"
                    wrapperclasses="w-full"
                    onChange={handleInputChange}
                    required
                    value={formData.capacity}
                  />
                  <Input id="price" type="number" placeholder="Price of the course" label wrapperclasses="w-full"
                         onChange={handleInputChange} required value={formData.price} />
                </div>
                {/*<div class="flex flex-col lg:flex-row justify-between items-center gap-x-3">*/}
                {/*  <Input id="markup_price" type="number" placeholder="Markup Price Rs" label wrapperclasses="w-full" onChange={handleInputChange} required value={formData.markup_price} />*/}
                {/*  <Input id="stock" type="number" placeholder="Available Stock" label wrapperclasses="w-full" onChange={handleInputChange} required value={formData.stock} />*/}
                {/*</div>*/}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="locatoin" placeholder="Course location" label wrapperclasses="w-full"
                         onChange={handleInputChange}
                         required value={formData.location} />
                  <Dropdown id="type" filterkey="type" label="Days" options={allowedDays} className="h-14"
                            wrapperclasses="my-2 sm:my-0" onChange={handleInputChange} />
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="start_date" placeholder="Start Date" label type="date" wrapperclasses="w-full"
                         onChange={handleInputChange} required value={formData.start_date} />
                  <Input id="end_date" placeholder="End Date" label type="date" wrapperclasses="w-full"
                         onChange={handleInputChange} required value={formData.end_date} />
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="start_time" placeholder="Start Time" label type="time" wrapperclasses="w-full"
                         onChange={handleInputChange} required value={formData.start_time} />
                  <Input id="end_time" placeholder="End Time" label type="time" wrapperclasses="w-full"
                         onChange={handleInputChange} required value={formData.end_time} />
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="description" placeholder="Coures Description" label textarea rows="5"
                         wrapperclasses="w-full" onChange={handleInputChange} required value={formData.description} />
                </div>
              </div>

              {/* Lecture Notes Section */}
              {formData?.content?.lectureNotes?.map((note, index) => (
                <div key={index}>
                  <Input placeholder="Title" wrapperclasses="w-full" value={note.title} onChange={(e) => {}} />
                  <Input placeholder="Content" wrapperclasses="w-full" value={note.content} onChange={(e) => {}} />
                  {/* Additional fields for lecture notes */}
                </div>
              ))}
              <Button className="w-full py-4 mb-4">{courseId ? 'Edit' : 'Add'} Lecture Note</Button>

              {/* Videos Section */}
              {formData?.content?.videos?.map((video, index) => (
                <div key={index}>
                  <Input placeholder="Title" value={video.title} onChange={(e) => {}} />
                  <Input placeholder="URL" value={video.url} onChange={(e) =>{}} />
                  {/* Additional fields for videos */}
                </div>
              ))}
              <Button className="w-full py-4 mb-4">{courseId ? 'Edit' : 'Add'} Video</Button>

              {/* Quizzes Section */}
              {formData?.content?.quizzes?.map((quiz, index) => (
                <div key={index}>
                  <Input placeholder="Title" value={quiz.title} onChange={(e) => {}} />
                  {/* Add logic to render quiz questions here */}
                  <Button onClick={() =>{}}>Add Question</Button>
                </div>
              ))}
              <Button className="w-full py-4 mb-4">{courseId ? 'Edit' : 'Add'}Add Quiz</Button>
              {/*<input ref={input} accept="image/" type="file" class="hidden" onChange={async (e) => handleInputChange({*/}
              {/*  target: {*/}
              {/*    id: 'image',*/}
              {/*    value: await base64EncodeImage(e.target.files),*/}
              {/*  },*/}
              {/*})} />*/}
              <Button className="w-full py-4">{courseId ? 'Edit' : 'Publish'} Course</Button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default CourseForm;
