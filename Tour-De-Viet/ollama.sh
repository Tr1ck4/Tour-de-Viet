#!/usr/bin/env bash

ollama serve &
ollama list
ollama pull gemma:2b