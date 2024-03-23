import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function ErrorPopUp(error) {
    console.log(error)
    let message = error.message
    const errors = [
        {
            code: "Firebase: Error (auth/email-already-in-use).",
            new: "User Already Exists Please Sign In"
        }
    ]

    const newMessage  = errors.map(m => {
        if(m.code == message){
            message = m.new
        }
    })


  return (
    <div className="rounded-md bg-red-50 p-4 mt-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Attention needed</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
