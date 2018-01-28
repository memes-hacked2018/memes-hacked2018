import os
import time
from sklearn.utils import shuffle
from getMemes import memeFinder
import cv2
import numpy as np
import matplotlib.pyplot as plt

from lasagne import layers
from lasagne.nonlinearities import softmax, tanh
from lasagne import objectives
from lasagne import updates
from getMemes import tagMap
import theano
import theano.tensor as T


def buildModel():
    

    #this is our input layer with the inputs (None, dimensions, width, height)
    l_input = layers.InputLayer((None, 3, 32, 32))

    #first convolutional layer, has l_input layer as incoming and is followed by a pooling layer
    l_conv1 = layers.Conv2DLayer(l_input, num_filters=32, filter_size=3, pad='same', nonlinearity=tanh)
    l_pool1 = layers.MaxPool2DLayer(l_conv1, pool_size=2)

    #second convolution (l_pool1 is incoming), let's increase the number of filters
    l_conv2 = layers.Conv2DLayer(l_pool1, num_filters=64, filter_size=3, pad='same', nonlinearity=tanh)
    l_pool2 = layers.MaxPool2DLayer(l_conv2, pool_size=2)

    #third convolution (l_pool2 is incoming), even more filters
    l_conv3 = layers.Conv2DLayer(l_pool2, num_filters=128, filter_size=3, pad='same', nonlinearity=tanh)
    l_pool3 = layers.MaxPool2DLayer(l_conv3, pool_size=2)

    #fourth and final convolution
    l_conv4 = layers.Conv2DLayer(l_pool3, num_filters=256, filter_size=3, pad='same', nonlinearity=tanh)
    l_pool4 = layers.MaxPool2DLayer(l_conv4, pool_size=2)

    #our cnn contains 3 dense layers, one of them is our output layer
    l_dense1 = layers.DenseLayer(l_pool4, num_units=128, nonlinearity=tanh)
    l_dense2 = layers.DenseLayer(l_dense1, num_units=128, nonlinearity=tanh)

    #the output layer has 5 units which is exactly the count of our class labels
    #it has a softmax activation function, its values represent class probabilities
    l_output = layers.DenseLayer(l_dense2, len(tagMap), nonlinearity=softmax)

    #let's see how many params our net has
    print("MODEL HAS", layers.count_params(l_output), "PARAMS")

    #we return the layer stack as our network by returning the last layer
    return l_output

NET = buildModel()

#load trained model to recognize images faster
with np.load('model69.npz') as f:
     param_values = [f['arr_%d' % i] for i in range(len(f.files))]
data = layers.set_all_param_values(NET, param_values[0])

#################### LOSS FUNCTION ######################
def calc_loss(prediction, targets):

    #categorical crossentropy is the best choice for a multi-class softmax output
    l = T.mean(objectives.categorical_crossentropy(prediction, targets))
    
    return l

#theano variable for the class targets
#this is the output vector the net should predict
targets = T.matrix('targets', dtype=theano.config.floatX)

#get the network output
prediction = layers.get_output(NET)

#calculate the loss
loss = calc_loss(prediction, targets)

################# ACCURACY FUNCTION #####################
def calc_accuracy(prediction, targets):

    #we can use the lasagne objective categorical_accuracy to determine the top1 accuracy
    a = T.mean(objectives.categorical_accuracy(prediction, targets, top_k=1))
    
    return a

accuracy = calc_accuracy(prediction, targets)

####################### UPDATES #########################
#get all trainable parameters (weights) of our net
params = layers.get_all_params(NET, trainable=True)

#we use the adam update
#it changes params based on our loss function with the learning rate
param_updates = updates.adam(loss, params, learning_rate=0.0001)

#################### TRAIN FUNCTION ######################
#the theano train functions takes images and class targets as input
#it updates the parameters of the net and returns the current loss as float value
#compiling theano functions may take a while, you might want to get a coffee now...
print("COMPILING THEANO TRAIN FUNCTION...")
train_net = theano.function([layers.get_all_layers(NET)[0].input_var, targets], loss, updates=param_updates)
print(train_net)
print("DONE!")

################# PREDICTION FUNCTION ####################
#we need the prediction function to calculate the validation accuracy
#this way we can test the net after training
#first we need to get the net output
net_output = layers.get_output(NET)

#now we compile another theano function; this may take a while, too
print("COMPILING THEANO TEST FUNCTION...")
test_net = theano.function([layers.get_all_layers(NET)[0].input_var, targets], [net_output, loss, accuracy])
print(test_net)
print("DONE!")

##################### STAT PLOT ##########################
plt.ion()
def showChart(epoch, t, v, a):

    #new figure
    plt.figure(0)
    plt.clf()

    #x-Axis = epoch
    e = range(0, epoch + 1)

    #loss subplot
    plt.subplot(211)
    plt.plot(e, train_loss, 'r-', label='Train Loss')
    plt.plot(e, val_loss, 'b-', label='Val Loss')
    plt.ylabel('loss')

    #show labels
    plt.legend(loc='upper right', shadow=True)

    #accuracy subplot
    plt.subplot(212)
    plt.plot(e, val_accuracy, 'g-')
    plt.ylabel('accuracy')
    plt.xlabel('epoch')

    #show
    plt.show()
    plt.pause(0.5)

###################### TRAINING #########################
print("START TRAINING...")
train_loss = []
val_loss = []
val_accuracy = []

(image_batch, target_batch) = memeFinder()


print("THIS DIDNT' FAIL HEE HE XD")
for epoch in range(0, 1):

    #start timer
    start = time.time()

    #iterate over train split batches and calculate mean loss for epoch
    t_l = []

    #calling the training functions returns the current loss
    l = train_net(image_batch, target_batch)
    t_l.append(l)

    #we validate our net every epoch and pass our validation split through as well
    v_l = []
    v_a = []

    #calling the test function returns the net output, loss and accuracy
    prediction_batch, l, a = test_net(image_batch, target_batch)
    v_l.append(l)
    v_a.append(a)

    #stop timer
    end = time.time()

    #calculate stats for epoch
    train_loss.append(np.mean(t_l))
    val_loss.append(np.mean(v_l))
    val_accuracy.append(np.mean(v_a))

    #print stats for epoch
    print("EPOCH:", epoch)
    print("TRAIN LOSS:", train_loss[-1])
    print("VAL LOSS:", val_loss[-1])
    print("VAL ACCURACY:", (int(val_accuracy[-1] * 1000) / 10.0), "%")
    print("TIME:", (int((end - start) * 10) / 10.0), "s")

    #show chart
    showChart(epoch, train_loss, val_loss, val_accuracy)

print("TRAINING DONE!")

    