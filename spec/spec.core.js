
describe 'Twitcher'
  before
    search = Twitcher("from:markwunsch")
  end
  
  it 'should return a Twitcher object'
    search.should.be_an Object
  end
  
  it 'should remember the query string'
    search.setup.query_string.should.be "from:markwunsch"
  end
  
  it 'should compose a Twitter API url'
    search.compose_url().should.be "http://search.twitter.com/search.json?q=from:markwunsch"
  end
  
  it 'should reach out to Twitter and get tweets'    
  end
  
  it 'should notify Twitcher on success'
  end
  
end