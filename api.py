from flask import Flask, Response,jsonify,request,render_template,url_for,flash,redirect
import base64
import pickle
import json
import numpy as np
import cv2
import time
import uuid
import shutil
# import urllibre
import os
from io import BytesIO


app = Flask(__name__)
app.config["CACHE_TYPE"] = "null"

# declare var 


def save_image(image):
    session_id = str(uuid.uuid1())
    dirpath = os.path.join('static/data', session_id)
    os.makedirs(dirpath)
    inpath = os.path.join(dirpath, 'input.jpg')
    cv2.imwrite(inpath, image)
    return inpath

@app.route("/", methods=['GET','POST']) # webapi
def upload_file():
    
    bg=time.time()
    if request.method == "GET":
      return render_template("index.html")
    if request.method == 'POST': 
        image=request.form["image"]
        try:
            image=image.split(",")[1]
            image=base64.b64decode(image)
            image= np.frombuffer(image, dtype=np.uint8)
            image = cv2.imdecode(image, flags=1)
            path = save_image(image) # save original image

            #test result is image
            res_img = image.copy()
            b64_res_img = convert_tob64(res_img)
            
            return render_template("index.html")  
        
        
        except:
          print("No image selected")
          return render_template("index.html")
       
            

def convert_tob64(frame):
     _, im_arr = cv2.imencode('.png', frame)  # im_arr: image in Numpy one-dim array format.
     im_bytes = im_arr.tobytes()
     im_b64 = base64.b64encode(im_bytes)    
     return "data:image/png;base64,"+str(im_b64)[2:-1]

@app.route("/api",methods=['GET','POST'])
def process():
    #todo
    return


if __name__ == "__main__":
    #predict = Process()
    app.run(host="0.0.0.0",port=2345,debug=True,threaded=True)


