
describe 'Twitcher'
  before
    search = Twitcher("from:markwunsch",{'lang':'en','rpp':'20','show_user':false, 'foo':'bar'})
  end
  
  it 'should return a Twitcher object'
    search.should.be_an Object
  end
  
  it 'should remember the query string'
    search.setup.query_string.should.be "from:markwunsch"
  end
  
  it 'should compose/encode a Twitter API url'
    search.compose_url().should.be "http://search.twitter.com/search.json?q=from%3Amarkwunsch"
  end
  
  it 'should accept parameters for Search API'
    search.setup.parameters.lang.should.be 'en'
    search.setup.parameters.rpp.should.be '20'
    search.setup.parameters.show_user.should.be 'false'
  end
  
  it 'should not allow params not defined by Search API'
    search.setup.parameters.foo.should_not.be 'bar'
  end
  
end