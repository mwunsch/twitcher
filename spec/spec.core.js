
describe 'Twitcher'
  before_each
    search = Twitcher("from:markwunsch")
  end
  
  it 'should create a Twitcher object'
    search.should.be_an Object
  end
  
  it 'should remember the query string'
    search.query_string.should.be "from:markwunsch"
  end
  
  it 'should compose/encode a Twitter API url'
    search.compose_url().should.be "http://search.twitter.com/search.json?q=from%3Amarkwunsch"
  end
  
  it 'should have no params'
    search.parameters.should.be_empty
  end
  
  describe 'with params'
    before_each
      search = Twitcher("foobar",{'lang':'en','rpp':'20','show_user':false, 'foo':'bar'})
    end
    
    it 'should setup'
      search.should.be_an Object
      search.query_string.should.be "foobar"
    end

    it 'should accept parameters for Search API'
      search.parameters.lang.should.be 'en'
      search.parameters.rpp.should.be '20'
      search.parameters.show_user.should.be 'false'
      search.parameters.show_user.should_not.be false
    end

    it 'should not allow params not defined by Search API'
      search.parameters.foo.should_not.be 'bar'
    end
    
    it 'should compose/encode a Twitter API url'
      
    end
  end
  
end