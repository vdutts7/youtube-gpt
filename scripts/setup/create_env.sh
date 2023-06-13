#!/bin/bash

# Name of the environment, passed as a command line argument
ENV_NAME=$1

# Create a new conda environment with the specified name and Python version
conda create --name $ENV_NAME python=3.8

# Activate the new environment
conda activate $ENV_NAME

# Install the requirements
pip install -r requirements.txt
