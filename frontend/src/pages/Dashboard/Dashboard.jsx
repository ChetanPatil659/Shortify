import React, { useEffect, useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import axios from 'axios'
import httpClient from '../../Services/httpClient'
import { deleteUrlByUrlCode, getUrlForUser, updateUrlByUrlCode } from '../../Services/urlServices'
import UrlTable from '../../components/UrlTable/UrlTable'
import moment from 'moment'
import ReactModal from 'react-modal'
import { CategoryScale, Chart } from 'chart.js/auto'
import BarChart from '../../components/Chart/BarChart'
import randomColor from 'randomcolor'
import PieChart from '../../components/Chart/PieChart'

Chart.register(CategoryScale)

var colors = ['#21f81f', '#2c7250', '#a4a0d0', '#f971e4', '#dcef27', '#a6598a', '#3700f2', '#3cb649', '#dec5db', '#dbc0b3', '#3d470b', '#688adf', '#120ab9', '#49a018', '#4a28a0', '#964c46', '#86091e', '#416f36', '#b3b46a', '#b30469', '#686c2a', '#d9e670', '#ccd067', '#764d2d', '#7ddad1', '#93bceb', '#edff53', '#973b2f', '#845f64', '#fbb461']

function Dashboard() {
  const [showUrlAddView, setShowUrlAddView] = useState(false)
  const [urlPayload, setUrlPayload] = useState({ originalLink: '', name: '' })
  const [shortUrl, setShortUrl] = useState('')
  const [urls, setUrls] = useState([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editUrlData, setEditUrlData] = useState()
  const [chartData, setChartData] = useState({});
  const [count, setCount] = useState(0)

  // let visitCountLabel

  if (!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }

  let visitCount = []
  let c=0
  let nameData = []
  useEffect(() => {
    if (urls.length != 0) {
      visitCount = urls.map((data) => {
        // setCount(count + data.visitCount)
        c += data.visitCount
        console.log(c)
        return data.visitCount
      })
      nameData = urls.map((data) => data.name)
      // colors = urls.map(()=> randomColor())
    }
    setCount(c)
    setChartData({
      labels: nameData,
      datasets: [
        {
          label: "Url Views",
          data: visitCount,
          backgroundColor: colors,
          borderWidth: 1,
        }
      ],
    })

  }, [urls])


  const postDataToApi = async () => {
    if (!urlPayload.originalLink) {
      alert('please provide original link')
      return;
    }
    try {
      const { data } = await httpClient.post('url', urlPayload)
      setShortUrl(`http://localhost:5001/api/url/${data.urlCode}`)
      console.log(shortUrl)
      console.log(data)
    } catch (error) {
      console.log(error, 'dashboard post request');
    }
  }

  const fetchUrlsForUser = async () => {
    try {
      const urlData = await getUrlForUser().then(data => {
        setUrls(data)
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUrlsForUser()
  }, [])

  const renderEditModal = () => {
    const onCancel = () => {
      setIsEditDialogOpen(false);
      setEditUrlData({});
    };
    return (
      <ReactModal
        isOpen={isEditDialogOpen}
        onRequestClose={onCancel}
        style={modalStyles}
      >
        <h3 style={{ marginBottom: 20 }} className='text-gray-500 text-[20px]'>Edit <span className='text-[#417B5A] font-bold'>{editUrlData?.name}</span></h3>
        <div
          style={{ display: "flex", flexDirection: "column", justifyContent: 'center', gap: 10, width: '100%', alignItems: 'center' }}
        >
          <TextInput
            label="Original Url"
            placeholder={editUrlData?.originalLink}
            handleChange={(val) =>
              setEditUrlData({
                ...editUrlData,
                originalLink: val.toLocaleString(),
              })
            }
          />
          <TextInput
            label="Name"
            placeholder={editUrlData?.name}
            handleChange={(val) =>
              setEditUrlData({
                ...editUrlData,
                name: val.toLocaleString(),
              })
            }
          />
        </div>
        <div
          style={{ marginTop: 30, display: "flex", flexDirection: "column", justifyContent: 'center', gap: 10, width: '100%', alignItems: 'center' }}
        >
          <Button
            handleClick={() => {
              updateUrlByUrlCode(editUrlData).then(() => {
                alert('Updated')
                onCancel()
                window.location.reload();
              })
            }}
            type='primary'
            text='Edit'
          />
          <Button
            label="Cancel"
            handleClick={onCancel}
            type="secondary"
            text='Cancel'
          />
        </div>
      </ReactModal>
    );
  };

  return (
    <div className='flex flex-col items-center w-full py-4'>
      {
        urls.length == 0 ?
          <>
            {!showUrlAddView && <div className='flex flex-col gap-2 w-full items-center justify-center h-[80vh]'>
              <h1>You don't have any url, create one</h1>
              <Button
                type='primary'
                text='create url'
                handleClick={() => setShowUrlAddView(true)}
              />
            </div>}

            {showUrlAddView && <>
              <div className='flex flex-col gap-2 w-full items-center justify-center h-[80vh]'>
                <TextInput
                  handleChange={(val) => setUrlPayload({ ...urlPayload, originalLink: val.toLocaleString() })}
                  type='text'
                  label='Original link'
                  placeholder='https://www.example.com/'
                />
                <TextInput
                  handleChange={val => setUrlPayload({ ...urlPayload, name: val })}
                  type='text'
                  label='Name'
                  placeholder='Example site'
                />
                <Button
                  type='primary'
                  text='Create Url'
                  handleClick={() => {
                    postDataToApi().then(() => {
                      alert('created')
                      setShowUrlAddView(false)
                      window.location.reload()
                    })
                  }}
                />
                <Button
                  type='secondary'
                  text='Cancel'
                  handleClick={() => {
                    setShowUrlAddView(false)
                    setUrlPayload({ name: '', originalLink: '' })
                  }}
                />
              </div>
            </>}
          </>
          :
          <>
            {/* {chartDataSet()} */}
            {showUrlAddView && <>
              <div className='flex flex-col gap-2 w-full items-center justify-center h-[80vh]'>
                <TextInput
                  handleChange={(val) => setUrlPayload({ ...urlPayload, originalLink: val.toLocaleString() })}
                  type='text'
                  label='Original link'
                  placeholder='https://www.example.com/'
                />
                <TextInput
                  handleChange={val => setUrlPayload({ ...urlPayload, name: val })}
                  type='text'
                  label='Name'
                  placeholder='Example site'
                />
                <Button
                  type='primary'
                  text='Create Url'
                  handleClick={() => {
                    postDataToApi().then(() => {
                      alert('created')
                      setShowUrlAddView(false)
                      window.location.reload()
                    })
                  }}
                />
                <Button
                  type='secondary'
                  text='Cancel'
                  handleClick={() => {
                    setShowUrlAddView(false)
                    setUrlPayload({ name: '', originalLink: '' })
                  }}
                />
              </div>
            </>}
            {!showUrlAddView &&
              <><div className='w-full max-w-4xl px-4 flex items-center justify-between mt-6'>
                <h3>Your shortified urls</h3>
                <button
                  className='text-[#417B5A] hover:bg-[#417B5A] hover:text-white px-2 py-1 rounded border-[#417B5A] border-2'
                  onClick={() => setShowUrlAddView(true)}
                > create url </button>
                {renderEditModal()}
              </div>
                <div className='px-4 w-full flex flex-col items-center mt-4 overflow-x-auto'>
                  <UrlTable columns={tableColumn} rows={urls.map(_ => convertData(_, setEditUrlData, setIsEditDialogOpen))} />
                </div>
                <div className='flex lg:flex-row md:flex-row flex-col items-center justify-center gap-16 mt-10'>
                  {/* <BarChart chartData={chartData} count={count} />
                  <PieChart chartData={chartData} count={count} /> */}
                </div>
              </>}
          </>
      }
    </div>
  )
}

export default Dashboard

const tableColumn = [
  { label: "Name", field: "name" },
  { label: "Link", field: "urlCode" },
  { label: "Visit", field: "visitCount" },
  { label: "Added date", field: "createdAt" },
  { label: "Actions", field: "actions", hideLabelinMobile: true },
];

const convertData = (data, setEditUrlData, setIsEditDialogOpen) => {
  return {
    ...data,
    urlCode: `http://localhost:5001/api/url/${data.urlCode}`,
    createdAt: moment.unix(Number(data.createdAt) / 1000).format('l'),
    actions: renderAction(data, setEditUrlData, setIsEditDialogOpen)
  }
}

const deleteUrl = async (urlCode) => {
  await deleteUrlByUrlCode(urlCode)
}

const renderAction = (data, setEditUrlData, setIsEditDialogOpen) => {
  return (
    <div className='flex gap-3'>
      <button onClick={() => {
        setEditUrlData(data)
        setIsEditDialogOpen(true)
      }}>
        <i className="ri-pencil-line" style={{ color: 'green', fontSize: 18 }} />
      </button>
      <button onClick={() => {
        alert('sure you want to delete this')
        deleteUrl(data.urlCode).then(() => {
          alert('deleted')
          window.location.reload()
        })
      }}>
        <i className="ri-delete-bin-line" style={{ color: 'red', fontSize: 18 }} />
      </button>
    </div>
  )
}

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    width: '100%',
    alignItems: 'center'
  },
};
